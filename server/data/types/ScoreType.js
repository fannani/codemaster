import {GraphQLNonNull, GraphQLObjectType, GraphQLString,GraphQLID} from "graphql";

const ScoreType = new GraphQLObjectType({
  name: "Score",
  description: "This represent a Score",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLID)},
    userid: {type: new GraphQLNonNull(GraphQLID)},
    stageid: {type: new GraphQLNonNull(GraphQLID)},
    score: {type: new GraphQLNonNull(GraphQLInt)},
    time: {type: new GraphQLNonNull(GraphQLInt)},
    stars: {type: new GraphQLNonNull(GraphQLInt)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});

export default ScoreType;