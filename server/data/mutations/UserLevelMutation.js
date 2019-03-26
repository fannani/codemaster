import { GraphQLNonNull, GraphQLInt } from 'graphql';

import UserLevel from '../models/UserLevel';
import UserLevelType from '../types/UserLevelType';

const UserLevelMutation = {
  addUserLevel: {
    type: UserLevelType,
    description: 'Add UserLevel',
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

export default UserLevelMutation;
