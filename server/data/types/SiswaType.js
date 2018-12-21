import {GraphQLNonNull, GraphQLObjectType, GraphQLString,GraphQLID,GraphQLInt} from "graphql";

const SiswaType = new GraphQLObjectType({
  name: "Siswa",
  description: "This represent a Siswa",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLID)},
    energy: {type: new GraphQLNonNull(GraphQLInt)},
    address: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});

export default SiswaType;