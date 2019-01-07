import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import Player from '../models/Player';
import PlayerType from '../types/PlayerType';

let PlayerMutation = {
  reduceEnergy: {
    type: PlayerType,
    description: 'Reduce Energy',
    args: {
      energy: { type: new GraphQLNonNull(GraphQLInt)},
      userid: { type: new GraphQLNonNull(GraphQLID)},
    },
    async resolve(root, { energy, userid }) {
      let player = await Player.findById(userid);
      player.energy -= energy;
      return await player.save();
    },
  },
  register: {
    type: PlayerType,
    description: 'Register a player'
    args: {
      email: {type: new GraphQLNonNull(GraphQLString)},
      password: {type: new GraphQLNonNull(GraphQLString)}
    },
    async resolve(root, {email,password}){
      let user
    }
  }
};

export default PlayerMutation;
