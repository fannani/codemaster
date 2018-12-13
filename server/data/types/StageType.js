import {GraphQLNonNull, GraphQLObjectType, GraphQLString,GraphQLID} from "graphql";

import CourseType from "./CourseType";

const StageType = new GraphQLObjectType({
    name: "Stage",
    description: "This represent a Stage",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        time: {type: new GraphQLNonNull(GraphQLString)},
        course: {
            type: CourseType,
            resolve: () => {

            }
        },
        updated_at: {type: new GraphQLNonNull(GraphQLString)}
    })
});

export default StageType;