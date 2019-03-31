import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import CourseType from '../../type';
import PlayerType from '../../../Player/type';
import StageType from '../type';
import Course from '../../Course';
import Stage from '../Stage';
import Player from '../../../Player/Player';
import Score from './Score';

const ScoreType = new GraphQLObjectType({
  name: 'Score',
  description: 'This represent a Score',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    player: {
      type: PlayerType,
      async resolve({ _id }) {
        const score = await Score.findOne({ _id });
        return await Player.findOne({ _id: score.player });
      },
    },
    course: {
      type: CourseType,
      async resolve({ _id }) {
        const score = await Score.findOne({ _id });
        return await Course.findOne({ _id: score.course });
      },
    },
    stage: {
      type: StageType,
      async resolve({ _id }) {
        const score = await Score.findOne({ _id });
        return await Stage.findOne({ _id: score.stage });
      },
    },
    score: { type: GraphQLNonNull(GraphQLInt) },
    time: { type: GraphQLNonNull(GraphQLInt) },
    stars: { type: GraphQLNonNull(GraphQLList(GraphQLBoolean)) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default ScoreType;