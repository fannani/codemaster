import { GraphQLID, GraphQLList } from 'graphql';
import ScoreType from '../types/ScoreType';
import User from '../models/User';

const users = {
  type: new GraphQLList(ScoreType),
  description: 'List of all Score',
  args: {
    _id: { type: GraphQLID },
  },
  resolve(parent,args) {
    return new Promise((resolve,reject)=>{
      User.find(args,function(err, users) {
        err ? reject(err) : resolve(users)
      })
    })
  },
};
export default users;
