import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import CourseType from '../types/CourseType';
import Course from '../models/Course';
import shortid from 'shortid';
import fs from 'fs';
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

let CourseMutation = {
  addCourse: {
    type: CourseType,
    description: 'Add Course',
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      desc: { type: new GraphQLNonNull(GraphQLString) },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(root, { file, name, desc }) {
      let id = '';
      if (file) {
        const { filename, mimetype, createReadStream } = await file;
        const stream = createReadStream();
        const filestore = await storeFS({ stream, filename });
        id = filestore.id;
      }
      let course = new Course({ name, desc, imageid: id });
      let newcourse = await course.save();
      return newcourse;
    },
  },
  uploadImage: {
    description: 'Uploads an image.',
    type: GraphQLString,
    args: {
      courseid: { type: GraphQLID },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(parent, { file, courseid }) {
      const { filename, mimetype, createReadStream } = await file;
      const stream = createReadStream();
      const { id, path } = await storeFS({ stream, filename });
      Course.update({ _id: courseid }, { $set: { imageid: id } });
      return id;
    },
  },
};

export default CourseMutation;
