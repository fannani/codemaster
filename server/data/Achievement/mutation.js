import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';

import AchievementType from './type';
import Achievement from './Achievement';

const AchievementMutation = {
  addAchievement: {
    type: AchievementType,
    description: 'Add  Achievement',
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      continuous: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    async resolve(root, { title, continuous }) {
      const newachiev = new Achievement({
        title,
        continuous,
      });
      return await newachiev.save();
    },
  },
};

export default AchievementMutation;
