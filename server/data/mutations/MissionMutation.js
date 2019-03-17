import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import MissionType from '../types/MissionType';
import Mission from '../models/Mission';
import Stage from '../models/Stage';

const MissionMutation = {
  addMission: {
    type: MissionType,
    description: 'Add Mission',
    args: {
      quest: { type: GraphQLNonNull(GraphQLString) },
      score: { type: GraphQLNonNull(GraphQLInt) },
      stage: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: (root, { quest, score, stage }) =>
      new Promise((resolve, reject) => {
        const newmission = new Mission({
          quest,
          score,
          stage,
        });
        newmission.save(err => {
          err ? reject(err) : resolve(newmission);
        });
      }),
  },
  updateMission: {
    type: MissionType,
    description: 'Update Mission',
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      quest: { type: GraphQLNonNull(GraphQLString) },
      score: { type: GraphQLNonNull(GraphQLInt) },
      stage: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, args) {
      const editmission = await Stage.findById(args.id);
      editmission.set(args);
      return await editmission.save();
    },
  },
};

export default MissionMutation;
