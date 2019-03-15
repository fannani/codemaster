import { GraphQLID, GraphQLList } from 'graphql';
import TestCase from '../models/TestCase';
import TestCaseType from '../types/TestCaseType';

const testcase = {
  type: new GraphQLList(TestCaseType),
  description: 'List of all TestCase',
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return await TestCase.find(args);
  },
};

export default testcase;
