import { GraphQLID, GraphQLList } from 'graphql';
import StageType from './type';
import Stage from './Stage';
import Course from '../Course';

const stages = {
  type: new GraphQLList(StageType),
  description: 'List of all Stage',
  args: {
    _id: {
      type: GraphQLID,
    },
    course: {
      type: GraphQLID,
    },
    player: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args) {
    if (args.player) {
      let course = await Course.findById(args.course);
      return await course.player(args.player);
    }
    return await Stage.find(args);
  },
};

export default stages;
