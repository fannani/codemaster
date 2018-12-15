import {GraphQLID, GraphQLList} from "graphql";
import StageType from "../types/StageType";
import Stage from '../models/Stage';

const stages = {
    type: new GraphQLList(StageType),
        description: "List of all Stage",
        args: {
            _id: {type: GraphQLID},
            course: {type: GraphQLID}
        },
        resolve: function(parent,args) {
        return new Promise((resolve,reject)=>{
            Stage.find(args,function(err, stages) {
                err ? reject(err) : resolve(stages)
            })
        })
    }
}

export default stages;