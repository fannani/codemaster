import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

import PlayerAchievementType from '../types/PlayerAchievementType';
import PlayerAchievement from '../models/PlayerAchievement';

const PlayerAchievementMutation = {
  addPlayerAchievement: {
    type: PlayerAchievementType,
    description: 'Add Player Achievement',
    args: {
      player: { type: new GraphQLNonNull(GraphQLID) },
      achievement: { type: new GraphQLNonNull(GraphQLID) },
      star: { type: new GraphQLNonNull(GraphQLInt) },
      point: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(root, { player, achievement, star, point }) {
      const newachiev = new PlayerAchievement({
        player,
        achievement,
        star,
        point,
      });
      return await newachiev.save();
    },
  },
};

export default PlayerAchievementMutation;
