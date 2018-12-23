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
      courses(_id: $courseid){
        name
        desc
        imageid
      }
    }
`;

export const ADD_COURSE = gql`
  mutation addCourse($file: Upload, $name: String!, $desc: String!) {
    addCourse(file: $file, name: $name, desc: $desc) {
      _id
      name
      desc
    }
  }
`;
