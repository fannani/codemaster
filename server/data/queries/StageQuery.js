import { GraphQLID, GraphQLList } from 'graphql';
import StageType from '../types/StageType';
import Stage from '../models/Stage';
import Course from '../models/Course';

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
