import { GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import PlayerType from '../types/PlayerType';
import Player from '../models/Player';

const player = {
  type: new GraphQLList(PlayerType),
  description: 'List of all Player',
  args: {
    _id: { type: GraphQLID },
    energy: { type: GraphQLInt },
  },
  resolve(parent,args) {
    return new Promise((resolve,reject)=>{
      Player.find(args,function(err, players) {
        err ? reject(err) : resolve(players)
      })
    })
  },
};

export default player;
