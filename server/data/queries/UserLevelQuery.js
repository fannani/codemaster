import { GraphQLID, GraphQLList } from 'graphql';
import UserLevel from '../models/UserLevel';
import UserLevelType from '../types/UserLevelType';

const userlevel = {
  type: new GraphQLList(UserLevelType),
  description: 'List of all UserLevel',
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return await UserLevel.find(args);
  },
};

export default userlevel;
