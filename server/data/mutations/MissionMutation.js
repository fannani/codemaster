import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import MissionType from '../types/MissionType';
import Mission from '../models/Mission';

const MissionMutation = {
  addMission: {
    type: MissionType,
    description: 'Add Mission',
    args: {
      quest: { type: GraphQLNonNull(GraphQLString) },
      testcase: { type: GraphQLList(GraphQLID) },
      params: { type: GraphQLList(GraphQLString) },
      score: { type: GraphQLNonNull(GraphQLInt) },
      stage: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: (root, { quest, testcase, score, stage, params }) =>
      new Promise((resolve, reject) => {
        const newmission = new Mission({
          quest,
          score,
          testcase,
          params,
          stage,
        });
        newmission.save(err => {
          err ? reject(err) : resolve(newmission);
        });
      }),
  },
};

export default MissionMutation;
