import gql from 'graphql-tag';

export const GET_MISSION_BY_ID = gql`
  query getMissionByID($id: ID!) {
    missions(_id: $id) {
      _id
      quest
      score
      testcase
      params
    }
  }
`;

export const ADD_MISSION = gql`
  mutation addMission(
    $quest: String!
    $testcase: [String]
    $score: Int!
    $stageid: ID!
  ) {
    addMission(
      quest: $quest
      testcase: $testcase
      score: $score
      stage: $stageid
    ) {
      _id
    }
  }
`;

export const UPDATE_MISSION = gql`
  mutation updateMission(
    $id: ID!
    $quest: String
    $testcase: [ID]
    $params: [String]
    $score: Int
    $stage: ID
  ) {
    updateMission(
      id: $id
      quest: $quest
      testcase: $testcase
      params: $params
      score: $score
      stage: $stage
    ) {
      _id
    }
  }
`;
