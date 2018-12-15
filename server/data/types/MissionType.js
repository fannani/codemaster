import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString,GraphQLID} from "graphql";
import {Schema} from "mongoose";
import StageType from "./StageType"
import Stage from "../models/Stage";
import Course from "../models/Course";
import Mission from "../models/Mission";

const MissionType = new GraphQLObjectType({
    name: "Mission",
    description: "This represent a Mission",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        stage: {type: StageType,  resolve : ( {_id}) => {
                return new Promise((resolve,reject) => {
                    Mission.findOne({_id},(err,stage)=>{
                        Stage.findOne({ _id : stage.stage   },(err,stage) =>{
                            resolve(stage);
                        });
                    })
                })
            }},
        quest: {type: new GraphQLNonNull(GraphQLString)},
        testcase: {type: new GraphQLNonNull(GraphQLString)},
        score: {type: new GraphQLNonNull(GraphQLInt)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},

    })
});

export default MissionType;
