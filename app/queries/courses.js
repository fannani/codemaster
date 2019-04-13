import gql from 'graphql-tag';

export const GET_COURSES = gql`
  {
    courses {
      _id
      name
      imageid
    }
  }
`;

export const GET_COURSE_BYID = gql`
  query GetCourseByID($courseid: ID!) {
    courses(_id: $courseid) {
      name
      desc
      script
      imageid
      stages {
        _id
        title
        time
        teory
        imageid
      }
      leaderboard {
        _id
        score
        player {
          _id
          user {
            name
          }
        }
      }
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse(
    $file: Upload
    $name: String!
    $desc: String!
    $script: String!
  ) {
    addCourse(file: $file, name: $name, desc: $desc, script: $script) {
      _id
      name
      desc
      script
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(
    $id: ID!
    $name: String
    $desc: String
    $script: String
  ) {
    updateCourse(id: $id, name: $name, desc: $desc, script: $script) {
      _id
      name
      desc
      script
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      _id
    }
  }
`;

export const ADD_SCORE = gql`
  mutation addScore(
    $player: ID!
    $course: ID!
    $stage: ID!
    $score: Int!
    $time: Int!
    $stars: [Boolean]!
  ) {
    addScore(
      player: $player
      course: $course
      stage: $stage
      score: $score
      time: $time
      stars: $stars
    ) {
      _id
      score
    }
  }
`;
