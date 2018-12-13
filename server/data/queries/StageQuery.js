import {GraphQLList} from "graphql";
import StageType from "../types/StageType";
import Stage from '../models/Stage';

const stages = {
    type: new GraphQLList(StageType),
        description: "List of all Stage",
        resolve: function() {
        return new Promise((resolve,reject)=>{
            Stage.find({},function(err, stages) {
                err ? reject(err) : resolve(stages)
            })
        })
    }
}

export default stages;