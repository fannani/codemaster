import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID } from 'graphql';
import { UserInputError } from 'apollo-server-express';
import Player from '../models/Player';
import User from '../models/User';
import PlayerType from '../types/PlayerType';
import UserType from '../types/UserType';

const PlayerMutation = {
  reduceEnergy: {
    type: PlayerType,
    description: 'Reduce Energy',
    args: {
      energy: { type: new GraphQLNonNull(GraphQLInt) },
      userid: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { energy, userid }) {
      const player = await Player.findById(userid);
      player.energy -= energy;
      return await player.save();
    },
  },

  addExp: {
    type: PlayerType,
    description: 'Adding Experience Point',
    args: {
      exp: { type: new GraphQLNonNull(GraphQLInt) },
      userid: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { exp, userid }) {
      const player = await Player.findById(userid);
      player.exp += exp;
      return await player.save();
    },
  },
  addFriend: {
    type: PlayerType,
    description: 'add friend',
    args: {
      playerid: { type: new GraphQLNonNull(GraphQLID) },
      friendid: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { playerid, friendid }) {
      const player = await Player.findById(playerid);
      player.friends.push(friendid);
      return await player.save();
    },
  },
  register: {
    type: UserType,
    description: 'Register a player',
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(root, { name, email, password }) {
      const exist = await User.find({ email });
      const validationErrors = {};
      if (exist.length <= 0) {
        const newplayer = new Player({
          energy: 0,
          birthday: Date.now(),
          exp: 0,
        });
        await newplayer.save();
        const newuser = new User({
          name,
          email,
          password,
          role: 'siswa',
          userdetailid: newplayer._id,
        });
        return await newuser.save();
      } else {
        validationErrors.email = 'Email sudah ada';
        throw new UserInputError('error', { validationErrors });
      }
    },
  },
};

export default PlayerMutation;
