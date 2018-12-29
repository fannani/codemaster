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
    _id: { type: new GraphQLNonNull(GraphQLID) },
    player: { type: new GraphQLNonNull(GraphQLID) },
    achievement: { type: new GraphQLNonNull(GraphQLID) },
    star: { type: new GraphQLNonNull(GraphQLInt) },
    point: { type: new GraphQLNonNull(GraphQLInt) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default PlayerAchievementType;
