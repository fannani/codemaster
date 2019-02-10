import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import Player from '../models/Player';
import User from '../models/User';
import PlayerType from '../types/PlayerType';
import UserType from '../types/UserType';


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
    type: UserType,
    description: 'Register a player',
    args: {
      name: {type:new GraphQLNonNull(GraphQLString)},
      email: {type: new GraphQLNonNull(GraphQLString)},
      password: {type: new GraphQLNonNull(GraphQLString)}
    },
    async resolve(root, {name,email,password}){
        let newplayer = new Player({
          energy : 0,
          birthday: Date.now(),
          exp: 0,
        })
        await newplayer.save();
        let newuser = new User({
          name,
          email,
          password,
          userdetailid: newplayer._id
        });
        return await newuser.save();
    }
  }
};

export default PlayerMutation;
