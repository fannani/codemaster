import {GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {Schema} from "mongoose";
import StageType from "./StageType"

const MissionType = new GraphQLObjectType({
    name: "Mission",
    description: "This represent a Mission",
    fields: () => ({
        stage: {type: StageType, resolve: ()=>{}},
        quest: {type: new GraphQLNonNull(GraphQLString)},
        testcase: {type: new GraphQLNonNull(GraphQLString)},
        score: {type: new GraphQLNonNull(GraphQLInt)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},

    })
});

export default MissionType;