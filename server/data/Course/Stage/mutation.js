import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import Stage from './Stage';
import { GraphQLUpload } from 'graphql-upload';
import StageType from './type';
import { storeFB } from '../../../utils/upload';

const StageMutation = {
  addStage: {
    type: StageType,
    description: 'Add Stage',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      teory: { type: GraphQLString },
      time: { type: GraphQLString },
      index: { type: GraphQLInt },
      exp_reward: { type: GraphQLInt },
      course: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { title, teory, time, course, index, exp_reward }) {
      let stage = new Stage({
        title,
        teory,
        time,
        course,
        exp_reward,
        // imageid : id
      });
      if (index) {
        stage.index = index;
      } else {
        const tmp = await Stage.findOne()
          .where({ course })
          .sort('-index');
        if (tmp) stage.index = tmp.index + 1;
        else stage.index = 1;
      }
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
      index: { type: GraphQLInt },
      time: { type: GraphQLInt },
      exp_reward: { type: GraphQLInt },
      course: { type: GraphQLID },
      file: { type: GraphQLUpload },
    },
    async resolve(root, args) {
      let id = '';
      if (args.file) {
        const { filename, createReadStream } = await args.file;
        const stream = createReadStream();
        const filestore = await storeFB({ stream, filename });
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
  deleteStage: {
    type: StageType,
    description: 'Delete Stage',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, args) {
      const stage = await Stage.findByIdAndRemove(args.id);
      return stage;
    },
  },
};

export default StageMutation;
