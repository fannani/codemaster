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
      quest: { type: new GraphQLNonNull(GraphQLString) },
      testcase: { type: new GraphQLList(GraphQLString) },
      score: { type: new GraphQLNonNull(GraphQLInt) },
      stage: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (root, { quest, testcase, score, stage }) => new Promise((resolve, reject) => {
        const newmission = new Mission({
          quest,
          score,
          testcase,
          stage,
        });
        newmission.save(err => {
          err ? reject(err) : resolve(newmission);
        });
      }),
  },
};

export default MissionMutation;
