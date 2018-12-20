import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';

import ScoreType from '../types/ScoreType';
import Score from '../models/Score';

let ScoreMutation = {
  addScore: {
    type: ScoreType,
    description: 'Add Score',
    args: {
      userid: { type: new GraphQLNonNull(GraphQLID) },
      stageid: { type: new GraphQLNonNull(GraphQLID) },
      score: { type: new GraphQLNonNull(GraphQLInt) },
      time: { type: new GraphQLNonNull(GraphQLInt) },
      stars: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, { quest, testcase, score, stage }) => {
      return new Promise((resolve, reject) => {
        let newscore = new Score({
          userid ,
          stageid,
          score,
          time,
          stars,
        });
        newscore.save(err => {
          err ? reject(err) : resolve(newscore);
        });
      });
    },
  },
};

export default ScoreMutation;
