import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';

const TestCaseMissionType = new GraphQLObjectType({
  name: 'TestCaseMission',
  description: 'This represent an TestCaseMission',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    mission: { type: GraphQLNonNull(GraphQLID) },
    testcase: { type: GraphQLNonNull(GraphQLID) },
    params: { type: GraphQLList(GraphQLString) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default TestCaseMissionType;
