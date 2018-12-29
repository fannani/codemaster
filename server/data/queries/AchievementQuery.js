import {GraphQLID, GraphQLList,GraphQLInt} from "graphql";
import AchievementType from "../types/AchievementType";
import Achievement from '../models/Achievement';

const achievement = {
  type: new GraphQLList(AchievementType),
  description: "List of all Player",
  args: {
    _id: {type: GraphQLID},
  },
  resolve: function(parent,args) {
    return new Promise((resolve,reject)=>{
      Achievement.find(args,function(err, achievement) {
        err ? reject(err) : resolve(achievement)
      })
    })
  }
}

export default achievement;