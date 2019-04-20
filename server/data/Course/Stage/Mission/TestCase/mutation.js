import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import TestCaseMission from './TestCaseMission';
import TestCaseMissionType from './type';

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
      return newtest.save();
    },
  },
};

export default TestCaseMissionMutation;
