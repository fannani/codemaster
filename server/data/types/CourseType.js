import {GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import StageType from './StageType';

const CourseType = new GraphQLObjectType({
    name: "Course",
    description: "This represent an course",
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        stages: {
            type: new GraphQLList(StageType),
            resolve : () => {

            }
        },
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    })
});

export default CourseType;

