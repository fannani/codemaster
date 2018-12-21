import courses from './queries/CourseQuery';
import stages from './queries/StageQuery';
import missions from './queries/MissionQuery';
import scores from './queries/ScoreQuery';
import siswa from './queries/SiswaQuery';
import courseMutation from './mutations/CourseMutation';
import stageMutation from './mutations/StageMutation';
import missionMutation from './mutations/MissionMutation';
import scoreMutation from './mutations/scoreMutation';

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const BKQueryRootType = new GraphQLObjectType({
  name: 'BKQueryRootType',
  description: 'BelajarKode Application Schema Query Root',
  fields: () => ({
    courses,
    stages,
    missions,
    scores,
    siswa
  }),
});
const BKMutationRootType = new GraphQLObjectType({
  name: 'BKMutationRootType',
  description: 'BelajarKode Application Schema Mutation Root',
  fields: () => ({
    addCourse: courseMutation.addCourse,
    addStage: stageMutation.addStage,
    addScore: scoreMutation.addScore,
    updateStage: stageMutation.updateStage,
    addMission: missionMutation.addMission,
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
