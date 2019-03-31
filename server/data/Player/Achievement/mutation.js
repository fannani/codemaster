import { GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';

import AchievementType from './type';
import PlayerAchievement from './PlayerAchievement';
import Achievement from '../../Achievement/Achievement';
import DetailAchievement from '../../Achievement/Detail/DetailAchievement';

const PlayerAchievementMutation = {
  addPlayerAchievement: {
    type: AchievementType,
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
  giveAchievement: {
    type: AchievementType,
    description: 'Give Achievement To Player',
    args: {
      player: { type: new GraphQLNonNull(GraphQLID) },
      achievement: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, { player, achievement }) {
      const playerAchiev = await PlayerAchievement.find({ player });
      const allDetail = await DetailAchievement.find({achievement});

      if(playerAchiev.length){
        const detail = await DetailAchievement.find({achievement, star : playerAchiev[0].star});
        if(playerAchiev.point < detail.target_point){
          playerAhiev.point += 1;
        } else if(playerAchiev.star < allDetail.length) {
          playerAchiev.star += 1;
        }
      } else {
        const newachiev = new PlayerAchievement({
          player,
          achievement,
          0,
          1,
        });
        return await newachiev.save();
      }
    },
  },
};

export default PlayerAchievementMutation;
