import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import courses from './queries/CourseQuery';
import stages from './queries/StageQuery';
import missions from './queries/MissionQuery';
import scores from './queries/ScoreQuery';
import users from './queries/UserQuery';
import userlevel from './queries/UserLevelQuery';
import players from './queries/PlayerQuery';
import playerAchievements from './queries/PlayerAchievementQuery';
import testcase from './queries/TestCaseQuery';
import testcaseMission from './queries/TestCaseMissionQuery';
import achievements from './queries/AchievementQuery';
import courseMutation from './mutations/CourseMutation';
import stageMutation from './mutations/StageMutation';
import missionMutation from './mutations/MissionMutation';
import scoreMutation from './mutations/ScoreMutation';
import playerMutation from './mutations/PlayerMutation';
import playerAchievementMutation from './mutations/PlayerAchievementMutation';
import testCaseMutation from './mutations/TestCaseMutation';
import testCaseMissionMutation from './mutations/TestCaseMissionMutation';
import userLevelMutation from './mutations/UserLevelMutation';

const BKQueryRootType = new GraphQLObjectType({
  name: 'BKQueryRootType',
  description: 'BelajarKode Application Schema Query Root',
  fields: () => ({
    courses,
    stages,
    missions,
    scores,
    userlevel,
    players,
    users,
    achievements,
    playerAchievements,
    testcase,
    testcaseMission,
  }),
});
const BKMutationRootType = new GraphQLObjectType({
  name: 'BKMutationRootType',
  description: 'BelajarKode Application Schema Mutation Root',
  fields: () => ({
    addCourse: courseMutation.addCourse,
    updateCourse: courseMutation.updateCourse,
    uploadImage: courseMutation.uploadImage,
    addStage: stageMutation.addStage,
    deleteStage: stageMutation.deleteStage,
    addScore: scoreMutation.addScore,
    addTestCase: testCaseMutation.addTestCase,
    updateStage: stageMutation.updateStage,
    addMission: missionMutation.addMission,
    updateMission: missionMutation.updateMission,
    reduceEnergy: playerMutation.reduceEnergy,
    addPlayerAchievement: playerAchievementMutation.addPlayerAchievement,
    register: playerMutation.register,
    addTestCaseMission: testCaseMissionMutation.addTestCaseMission,
    addExp: playerMutation.addExp,
    addUserLevel: userLevelMutation.addUserLevel,
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
