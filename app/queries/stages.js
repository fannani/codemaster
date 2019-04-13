import gql from 'graphql-tag';

export const GET_STAGE_BY_COURSE_PLAYER = gql`
  query GetStageByCoursePlayer($courseid: ID!, $playerid: ID) {
    stages(course: $courseid, player: $playerid) {
      _id
      title
      time
      teory
      win
      score
      stars
      imageid
      course {
        _id
      }
    }
  }
`;

export const GET_STAGE_BY_ID = gql`
  query GetStageByID($id: ID!) {
    stages(_id: $id) {
      _id
      title
      time
      index
      exp_reward
      teory
      course {
        _id
        script
        stages {
          _id
          index
        }
      }
      missions {
        _id
        quest
        score
        testcase {
          params
          testcase {
            _id
            caption
            script
          }
        }
      }
    }
  }
`;

export const UPDATE_STAGE = gql`
  mutation updateStage(
    $file: Upload
    $title: String!
    $time: Int
    $id: ID!
    $teory: String
    $exp_reward: Int
  ) {
    updateStage(
      file: $file
      title: $title
      time: $time
      id: $id
      teory: $teory
      exp_reward: $exp_reward
    ) {
      _id
      title
      time
      teory
      course {
        _id
      }
    }
  }
`;

export const ADD_STAGE = gql`
  mutation addStage(
    $title: String!
    $teory: String
    $time: String
    $course: ID!
  ) {
    addStage(title: $title, teory: $teory, time: $time, course: $course) {
      _id
      title
      time
      teory
      course {
        _id
      }
    }
  }
`;

export const DELETE_STAGE = gql`
  mutation deleteStage($id: ID!) {
    deleteStage(id: $id) {
      _id
    }
  }
`;
