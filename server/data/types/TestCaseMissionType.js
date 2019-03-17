import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const TestCaseMissionType = new GraphQLObjectType({
  name: 'TestCaseMission',
  description: 'This represent an TestCaseMission',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    mission: { type: GraphQLNonNull(GraphQLID) },
    testcase: { type: GraphQLNonNull(GraphQLID) },
    params: { type: GraphQLList(GraphQLInt) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default TestCaseMissionType;
