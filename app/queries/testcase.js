import gql from 'graphql-tag';

export const GET_TESTCASES = gql`
  {
    testcase {
      _id
      caption
      script
    }
  }
`;

export const ADD_TESTCASE = gql`
  mutation addTestcase($caption: String!, $script: String!) {
    addTestCase(caption: $caption, script: $script) {
      _id
    }
  }
`;

export const DELETE_TESTCASE_MISSION = gql`
  mutation deleteTestCaseMission($id: ID!) {
    deleteTestCaseMission(id: $id) {
      _id
    }
  }
`;
