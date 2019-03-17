import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import TestCaseType from './TestCaseType';
import TestCaseMission from '../models/TestCaseMission';
import TestCase from '../models/TestCase';

const TestCaseMissionType = new GraphQLObjectType({
  name: 'TestCaseMission',
  description: 'This represent an TestCaseMission',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    mission: { type: GraphQLNonNull(GraphQLID) },
    testcase: {
      type: TestCaseType,
      async resolve({ _id }) {
        const data = await TestCaseMission.findOne({ _id });
        return await TestCase.findOne({ _id: data.testcase });
      },
    },
    params: { type: GraphQLList(GraphQLString) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default TestCaseMissionType;
