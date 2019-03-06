import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

import Stage from '../models/Stage';
import shortid from 'shortid';
import fs from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import StageType from '../types/StageType';
const UPLOAD_DIR = './dist/uploads';

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

const StageMutation = {
  addStage: {
    type: StageType,
    description: 'Add Stage',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      teory: { type: GraphQLString },
      time: { type: GraphQLString },
      course: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { title, teory, time, course }) {
      const stage = new Stage({
        title,
        teory,
        time,
        course,
        // imageid : id
      });
      return await stage.save();
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
      file: { type: GraphQLUpload },
    },
    async resolve(root, args) {
      let id = '';
      if (args.file) {
        const { filename, createReadStream } = await args.file;
        const stream = createReadStream();
        const filestore = await storeFS({ stream, filename });
        id = filestore.id;
      }
      const editstage = await Stage.findById(args.id);
      delete args.id;
      delete args.file;
      editstage.set(args);
      editstage.imageid = id;
      return await editstage.save();
    },
  },
};

export default StageMutation;
