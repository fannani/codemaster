import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

const BadgeType = new GraphQLObjectType({
  name: 'Badge',
  description: 'This represent a Badge',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: GraphQLString,
    imageid: GraphQLString,
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default BadgeType;
