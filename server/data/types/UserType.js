import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represent a User',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    userdetailid: { type: new GraphQLNonNull(GraphQLString) },
    password: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default UserType;
