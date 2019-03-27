import { GraphQLNonNull, GraphQLInt } from 'graphql';

import UserLevel from '../models/PlayerLevel';
import PlayerLevelType from '../types/PlayerLevelType';

const PlayerLevelMutation = {
  addPlayerLevel: {
    type: PlayerLevelType,
    description: 'Add PlayerLevel',
    args: {
      level: { type: GraphQLNonNull(GraphQLInt) },
      exp_req: { type: GraphQLNonNull(GraphQLInt) },
    },
    async resolve(root, { level, exp_req }) {
      const newdata = new UserLevel({
        level,
        exp_req,
      });
      return await newdata.save();
    },
  },
};

export default PlayerLevelMutation;
