import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';
import StageType from './Stage/type';
import Stage from './Stage/Stage';
import Course from './Course';
import LeaderboardType from '../Leaderboard/type';

const CourseType = new GraphQLObjectType({
  name: 'Course',
  description: 'This represent an course',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    script: { type: GraphQLString },
    desc: { type: GraphQLNonNull(GraphQLString) },
    imageid: { type: GraphQLString },
    stages: {
      type: GraphQLList(StageType),
      async resolve({ _id }) {
        return await Stage.find({ course: _id }).sort({ index: 1 });
      },
    },
    leaderboard: {
      type: GraphQLList(LeaderboardType),
      async resolve({ _id }) {
        let course = await Course.findById(_id);
        return await course.leaderboard();
      },
    },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default CourseType;
