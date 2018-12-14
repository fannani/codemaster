
import {

    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql'

import StageType from '../types/StageType'
import Stage from '../models/Stage'


let StageMutation = {
    addStage: {
        type: StageType,
        description: 'Add Stage',
        args: {
            title: {type: new GraphQLNonNull(GraphQLString)},
            teory: {type: new GraphQLNonNull(GraphQLString)},
            time: {type:new GraphQLNonNull(GraphQLString)},
            course: {type:new GraphQLNonNull(GraphQLID)}
        },
        resolve: (root,{ title,teory,time,course })=>{

            return new Promise((resolve,reject)=>{
                let newstage = new Stage({
                    title,teory,time,course
                });
                newstage.save((err) => {
                    err ? reject(err) : resolve(newstage)
                })
            })
        }
    }
}

export default StageMutation;
