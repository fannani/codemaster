import courses from './queries/CourseQuery';
import stages from './queries/StageQuery';
import missions from './queries/MissionQuery';
import scores from './queries/ScoreQuery';
import player from './queries/PlayerQuery';
import courseMutation from './mutations/CourseMutation';
import stageMutation from './mutations/StageMutation';
import missionMutation from './mutations/MissionMutation';
import scoreMutation from './mutations/scoreMutation';
import playerMutation from './mutations/playerMutation';

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const BKQueryRootType = new GraphQLObjectType({
  name: 'BKQueryRootType',
  description: 'BelajarKode Application Schema Query Root',
  fields: () => ({
    courses,
    stages,
    missions,
    scores,
    player,
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
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
