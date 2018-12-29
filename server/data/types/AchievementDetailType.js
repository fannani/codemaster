import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const AchievementDetailType = new GraphQLObjectType({
  name: 'AchievementDetail',
  description: 'This represent an AchievementDetail',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    achievement: { type: GraphQLID },
    star: { type: new GraphQLNonNull(GraphQLInt) },
    caption: { type: new GraphQLNonNull(GraphQLString) },
    target_point: { type: new GraphQLNonNull(GraphQLInt) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default AchievementDetailType;
