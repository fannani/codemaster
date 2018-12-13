import CourseType from './types/CourseType';
import StageType from './types/StageType';
import MissionType from './types/MissionType';


import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
}  from 'graphql';


const BKQueryRootType = new GraphQLObjectType({
    name: 'BKAppSchema',
    description: "BelajarKode Application Schema Query Root",
    fields: () => ({
        courses: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: function() {
                return Authors
            }
        },
        stages: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            resolve: function() {
                return Posts
            }
        },
        missions: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            resolve: function() {
                return Posts
            }
        }
    })
});

// This is the schema declaration
const BKAppSchema = new GraphQLSchema({
    query: BKQueryRootType
    // If you need to create or updata a datasource,
    // you use mutations. Note:
    // mutations will not be explored in this post.
    // mutation: BlogMutationRootType
});
 export default BlogAppSchema;