import { GraphQLID, GraphQLList } from 'graphql';
import PlayerLevel from '../models/PlayerLevel';
import PlayerLevelType from '../types/PlayerLevelType';

const playerlevel = {
  type: new GraphQLList(PlayerLevelType),
  description: 'List of all UserLevel',
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return await PlayerLevel.find(args);
  },
};

export default playerlevel;
