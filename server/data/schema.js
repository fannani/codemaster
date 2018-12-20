import courses from './queries/CourseQuery';
import stages from './queries/StageQuery';
import missions from './queries/MissionQuery';
import courseMutation from './mutations/CourseMutation';
import stageMutation from './mutations/StageMutation';
import missionMutation from './mutations/MissionMutation';

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const BKQueryRootType = new GraphQLObjectType({
  name: 'BKQueryRootType',
  description: 'BelajarKode Application Schema Query Root',
  fields: () => ({
    courses,
    stages,
    missions,
  }),
});
const BKMutationRootType = new GraphQLObjectType({
  name: 'BKMutationRootType',
  description: 'BelajarKode Application Schema Mutation Root',
  fields: () => ({
    addCourse: courseMutation.addCourse,
    addStage: stageMutation.addStage,
    updateStage: stageMutation.updateStage,
    addMission: missionMutation.addMission,
  }),
});

const BKAppSchema = new GraphQLSchema({
  query: BKQueryRootType,
  mutation: BKMutationRootType,
});
export default BKAppSchema;
