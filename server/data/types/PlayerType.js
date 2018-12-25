import {GraphQLNonNull, GraphQLObjectType, GraphQLString,GraphQLID,GraphQLInt} from "graphql";

const PlayerType = new GraphQLObjectType({
  name: "Player",
  description: "This represent a Player",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLID)},
    energy: {type: new GraphQLNonNull(GraphQLInt)},
    address: {type:  GraphQLString},
    birthday: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});

export default PlayerType;