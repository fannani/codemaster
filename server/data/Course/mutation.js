import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import fs from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import shortid from 'shortid';
import CourseType from './type';
import Course from './Course';

const UPLOAD_DIR = './dist/uploads';

const storeFS = ({ stream }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path })),
  );
};

const CourseMutation = {
  addCourse: {
    type: CourseType,
    description: 'Add Course',
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      desc: { type: GraphQLNonNull(GraphQLString) },
      script: { type: GraphQLNonNull(GraphQLString) },
      file: {
        description: 'Image file.',
        type: GraphQLUpload,
      },
    },
    async resolve(root, { file, name, desc, script }) {
      let id = '';
      if (file) {
        const { filename, createReadStream } = await file;
        const stream = createReadStream();
        const filestore = await storeFS({ stream, filename });
        id = filestore.id;
      }
      const course = new Course({ name, desc, imageid: id, script });
      const newcourse = await course.save();
      return newcourse;
    },
  },
  updateCourse: {
    type: CourseType,
    description: 'Update Course',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      desc: { type: GraphQLString },
      script: { type: GraphQLString },
    },
    async resolve(root, args) {
      const edit = await Course.findById(args.id);
      delete args.id;
      edit.set(args);
      return await edit.save();
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
