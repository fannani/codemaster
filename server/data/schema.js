import courses from './queries/CourseQuery';
import stages from './queries/StageQuery';
import missions from './queries/MissionQuery';
import scores from './queries/ScoreQuery';
import users from './queries/UserQuery';
import players from './queries/PlayerQuery';
import playerAchievements from './queries/PlayerAchievementQuery';
import achievements from './queries/AchievementQuery';
import courseMutation from './mutations/CourseMutation';
import stageMutation from './mutations/StageMutation';
import missionMutation from './mutations/MissionMutation';
import scoreMutation from './mutations/scoreMutation';
import playerMutation from './mutations/playerMutation';
import playerAchievementMutation from './mutations/PlayerAchievementMutation';

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const BKQueryRootType = new GraphQLObjectType({
  name: 'BKQueryRootType',
  description: 'BelajarKode Application Schema Query Root',
  fields: () => ({
    courses,
    stages,
    missions,
    scores,
    players,
    users,
    achievements,
    playerAchievements
  }),
});
const BKMutationRootType = new GraphQLObjectType({
  name: 'BKMutationRootType',
  description: 'BelajarKode Application Schema Mutation Root',
  fields: () => ({
    addCourse: courseMutation.addCourse,
    uploadImage: courseMutation.uploadImage,
    addStage: stageMutation.addStage,
    addScore: scoreMutation.addScore,
    updateStage: stageMutation.updateStage,
    addMission: missionMutation.addMission,
    reduceEnergy: playerMutation.reduceEnergy,
    addPlayerAchievement: playerAchievementMutation.addPlayerAchievement,
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
