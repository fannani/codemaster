import {GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean } from "graphql";

import ScoreType from '../types/ScoreType';
import Score from '../models/Score';

let ScoreMutation = {
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
    resolve: (root, { user, stage, score, time, stars }) => {
      return new Promise((resolve, reject) => {
        let newscore = new Score({
          user ,
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
