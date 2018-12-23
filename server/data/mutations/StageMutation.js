import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

import StageType from '../types/StageType';
import Stage from '../models/Stage';
import shortid from 'shortid';
import fs from 'fs';
import { GraphQLUpload } from 'graphql-upload/lib';

const storeFS = ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path })),
  );
};

let StageMutation = {
  addStage: {
    type: StageType,
    description: 'Add Stage',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      teory: { type: GraphQLString },
      time: { type: GraphQLString },
      course: { type: GraphQLNonNull(GraphQLID) },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(root, { file, title, teory, time, course }) {
      let id = '';
      if (file) {
        const { filename, mimetype, createReadStream } = await file;
        const stream = createReadStream();
        const filestore = await storeFS({ stream, filename });
        id = filestore.id;
      }
      let stage = new Stage({
        title,
        teory,
        time,
        course,
      });
      let newstage = await stage.save();
      return newcourse;
    },
  },
  updateStage: {
    type: StageType,
    description: 'Update Stage',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      teory: { type: GraphQLString },
      time: { type: GraphQLString },
      course: { type: GraphQLID },
    },
    resolve: (root, args) => {
      return new Promise((resolve, reject) => {
        Stage.findById(args.id, (err, data) => {
          delete args.id;
          data.set(args);
          data.save(err => {
            err ? reject(err) : resolve(data);
          });
        });
      });
    },
  },
};

export default StageMutation;
