import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const UserLevelType = new GraphQLObjectType({
  name: 'UserLevel',
  description: 'This represent a UserLevel',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    level: { type: GraphQLNonNull(GraphQLInt) },
    exp_point: { type: GraphQLNonNull(GraphQLInt) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default UserLevelType;
