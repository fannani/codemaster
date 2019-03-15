import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import courses from './queries/CourseQuery';
import stages from './queries/StageQuery';
import missions from './queries/MissionQuery';
import scores from './queries/ScoreQuery';
import users from './queries/UserQuery';
import players from './queries/PlayerQuery';
import playerAchievements from './queries/PlayerAchievementQuery';
import testcase from './queries/TestCaseQuery';
import achievements from './queries/AchievementQuery';
import courseMutation from './mutations/CourseMutation';
import stageMutation from './mutations/StageMutation';
import missionMutation from './mutations/MissionMutation';
import scoreMutation from './mutations/ScoreMutation';
import playerMutation from './mutations/PlayerMutation';
import playerAchievementMutation from './mutations/PlayerAchievementMutation';
import testCaseMutation from './mutations/TestCaseMutation';

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
    playerAchievements,
    testcase,
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
    addTestCase: testCaseMutation.addTestCase,
    updateStage: stageMutation.updateStage,
    addMission: missionMutation.addMission,
    reduceEnergy: playerMutation.reduceEnergy,
    addPlayerAchievement: playerAchievementMutation.addPlayerAchievement,
    register: playerMutation.register,
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
