import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

const CourseType = new GraphQLObjectType({
    name: "Course",
    description: "This represent an course",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
    })
});

export default CourseType;

