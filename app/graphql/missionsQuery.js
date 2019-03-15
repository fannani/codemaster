import gql from 'graphql-tag';

export const GET_MISSION_BY_ID = gql`
  query getMissionByID($id: ID!) {
    missions(_id: $id) {
      _id
      quest
      score
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
