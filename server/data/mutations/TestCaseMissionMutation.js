import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import TestCaseMission from '../models/TestCaseMission';
import TestCaseMissionType from '../types/TestCaseMissionType';

const TestCaseMissionMutation = {
  addTestCaseMission: {
    type: TestCaseMissionType,
    description: 'Add TestCase Mission',
    args: {
      mission: { type: GraphQLNonNull(GraphQLID) },
      testcase: { type: GraphQLNonNull(GraphQLID) },
      params: { type: GraphQLList(GraphQLString) },
    },
    async resolve(root, { mission, testcase, params }) {
      const newtest = new TestCaseMission({
        mission,
        testcase,
        params,
      });
      return await newtest.save();
    },
  },
};

export default TestCaseMissionMutation;
