import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import AchievementDetailType from './AchievementDetailType';
import DetailAchievement from '../models/DetailAchievement';

const AchievementType = new GraphQLObjectType({
  name: 'Achievement',
  description: 'This represent an course',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    continuous: { type: new GraphQLNonNull(GraphQLBoolean) },
    caption: { type: GraphQLString },
    star: { type: GraphQLInt },
    target_point: { type: GraphQLInt },
    point: { type: GraphQLInt },
    detail: {
      type: GraphQLList(AchievementDetailType),
      async resolve({ _id }) {
        return await DetailAchievement.find({ achievement: _id });
      },
    },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default AchievementType;
