
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
            title: {type:  GraphQLNonNull(GraphQLString)},
            teory: {type: GraphQLString},
            time: {type:GraphQLString},
            course: {type: GraphQLNonNull(GraphQLID)}
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
    },
    updateStage: {
        type: StageType,
        description: 'Update Stage',
        args: {
            id : {type: GraphQLNonNull(GraphQLID)},
            title: {type:GraphQLString},
            teory: {type: GraphQLString},
            time: {type:GraphQLString},
            course: {type:GraphQLID}
        },
        resolve: (root,args)=>{
            return new Promise((resolve,reject)=>{
                Stage.findById(args.id,(err,data) => {
                    delete args.id;
                    data.set(args);
                    data.save((err) => {
                        err ? reject(err) : resolve(data)
                    });
                })

            })
        }
    }
}

export default StageMutation;
