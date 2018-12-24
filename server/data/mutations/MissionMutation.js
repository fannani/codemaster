import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList } from "graphql";

import MissionType from '../types/MissionType';
import Mission from '../models/Mission';

let MissionMutation = {
  addMission: {
    type: MissionType,
    description: 'Add Mission',
    args: {
      quest: { type: new GraphQLNonNull(GraphQLString) },
      testcase: { type: new GraphQLList(GraphQLString) },
      score: { type: new GraphQLNonNull(GraphQLInt) },
      stage: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (root, { quest, testcase, score, stage }) => {
      return new Promise((resolve, reject) => {
        let newmission = new Mission({
          quest,
          score,
          testcase,
          stage,
        });
      
        newmission.save(err => {
          err ? reject(err) : resolve(newmission);
        });
      });
    },
  },
};

export default MissionMutation;
