import { GraphQLNonNull,GraphQLString } from 'graphql';

import TestCase from '../models/TestCase';
import TestCaseType from '../types/TestCaseType';

const TestCaseMutation = {
  addTestCase: {
    type: TestCaseType,
    description: 'Add TestCase',
    args: {
      caption: { type: GraphQLNonNull(GraphQLString) },
      script: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(root, { caption, script }) {
      const newtest = new TestCase({
        caption,
        script,
      });
      return await newtest.save();
    },
  },
};

export default TestCaseMutation;
