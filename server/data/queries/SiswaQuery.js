import {GraphQLID, GraphQLList,GraphQLInt} from "graphql";
import SiswaType from "../types/SiswaType";
import Siswa from '../models/Siswa';

const siswa = {
  type: new GraphQLList(SiswaType),
  description: "List of all Siswa",
  args: {
    _id: {type: GraphQLID},
    energy: {type: GraphQLInt},
  },
  resolve: function(parent,args) {
    return new Promise((resolve,reject)=>{
      Siswa.find(args,function(err, stages) {
        err ? reject(err) : resolve(stages)
      })
    })
  }
}

export default siswa;