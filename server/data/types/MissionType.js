import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import Authors from "../queries/authors";

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: function(post) {
                return _.find(Authors, a => a.id == post.author_id);
            }
        }
    })
});