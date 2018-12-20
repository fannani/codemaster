import {GraphQLID, GraphQLList} from "graphql";
import ScoreType from "../types/ScoreType";
import Score from "../models/Score";

const scores =  {
  type: new GraphQLList(ScoreType),
  description: "List of all Score",
  args: {
    userid: {type: GraphQLID}
  },
  resolve: function(parent,args) {
    return new Promise((resolve,reject)=>{
      Score.find(args,function(err, missions) {
        err ? reject(err) : resolve(missions)
      })
    })
  }
}
export default scores;