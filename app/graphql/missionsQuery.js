import gql from 'graphql-tag';

export const ADD_MISSION = gql`
  mutation addMission($quest: String!, $testcase: [String], $score: Int!, $stageid: ID! ) {
    addMission(quest: $quest, testcase: $testcase, score: $score, stage: $stageid) {
      _id
    }
  }
`;