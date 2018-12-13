import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import CourseType from "./CourseType";

const StageType = new GraphQLObjectType({
    name: "Stage",
    description: "This represent a Stage",
    fields: () => ({
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