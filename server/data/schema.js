import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import courses from './Course/query';
import stages from './Course/Stage/query';
import missions from './Course/Stage/Mission/query';
import scores from './Course/Stage/Score/query';
import users from './User/query';
import playerlevel from './Player/Level/query';
import players from './Player/query';
import playerAchievements from './Player/Achievement/query';
import testcase from './TestCase/query';
import testcaseMission from './Course/Stage/Mission/TestCase/query';
import achievements from './Achievement/query';
import courseMutation from './Course/mutation';
import stageMutation from './Course/Stage/mutation';
import missionMutation from './Course/Stage/Mission/mutation';
import scoreMutation from './Course/Stage/Score/mutation';
import playerMutation from './Player/mutation';
import playerAchievementMutation from './Player/Achievement/mutation';
import testCaseMutation from './TestCase/mutation';
import testCaseMissionMutation from './Course/Stage/Mission/TestCase/mutation';
import playerLevelMutation from './Player/Level/mutation';
import achievementMutation from './Achievement/mutation';
import detailAchievementMutation from './Achievement/Detail/mutation';

const BKQueryRootType = new GraphQLObjectType({
  name: 'BKQueryRootType',
  description: 'BelajarKode Application Schema Query Root',
  fields: () => ({
    courses,
    stages,
    missions,
    scores,
    playerlevel,
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
    addPlayerLevel: playerLevelMutation.addPlayerLevel,
    addAchievement: achievementMutation.addAchievement,
    addDetailAchievement: detailAchievementMutation.addDetailAchievement,
    deleteCourse: courseMutation.deleteCourse,
    reorderStage: stageMutation.reorderStage,
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
