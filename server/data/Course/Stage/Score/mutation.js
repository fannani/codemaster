import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import ScoreType from './type';
import Score from './Score';

const ScoreMutation = {
  addScore: {
    type: ScoreType,
    description: 'Add Score',
    args: {
      player: { type: new GraphQLNonNull(GraphQLID) },
      stage: { type: new GraphQLNonNull(GraphQLID) },
      course: { type: new GraphQLNonNull(GraphQLID) },
      score: { type: new GraphQLNonNull(GraphQLInt) },
      time: { type: new GraphQLNonNull(GraphQLInt) },
      stars: { type: new GraphQLNonNull(GraphQLList(GraphQLBoolean)) },
    },
    async resolve(root, { player, stage, score, time, stars, course }) {
      return new Promise((resolve, reject) => {
        const newscore = new Score({
          player,
          stage,
          score,
          time,
          stars,
          course,
        });
        newscore.save(err => {
          err ? reject(err) : resolve(newscore);
        });
      });
    },
  },
};

export default ScoreMutation;
