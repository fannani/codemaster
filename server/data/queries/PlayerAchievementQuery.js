import { GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import PlayerAchievementType from '../types/PlayerAchievementType';
import PlayerAchievement from '../models/PlayerAchievement';

const playerAchievements = {
  type: new GraphQLList(PlayerAchievementType),
  description: 'List of all Player Achievement',
  args: {
    _id: { type: GraphQLID },
    player: { type: GraphQLID },
  },
  resolve(parent,args) {
    return new Promise((resolve,reject)=>{
      PlayerAchievement.find(args,function(err, achievement) {
        err ? reject(err) : resolve(achievement)
      })
    })
  },
};

export default playerAchievements;
