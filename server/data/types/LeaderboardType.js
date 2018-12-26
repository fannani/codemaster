import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

import Player from '../models/Player';

import PlayerType from './PlayerType';

const LeaderboardType = new GraphQLObjectType({
  name: 'Leaderboard',
  description: 'This represent a Leaderboard',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    score: { type: new GraphQLNonNull(GraphQLInt) },
    player: {
      type: PlayerType,
      async resolve({ _id }) {
        return await Player.findOne({ _id });
      },
    },
  }),
});

export default LeaderboardType;
