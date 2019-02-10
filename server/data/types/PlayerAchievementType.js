import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

const PlayerAchievementType = new GraphQLObjectType({
  name: 'PlayerAchievement',
  description: 'This represent an PlayerAchievement',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    player: { type: GraphQLNonNull(GraphQLID) },
    achievement: { type: GraphQLNonNull(GraphQLID) },
    star: { type: GraphQLNonNull(GraphQLInt) },
    point: { type: GraphQLNonNull(GraphQLInt) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default PlayerAchievementType;
