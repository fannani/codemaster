import gql from 'graphql-tag';

export const GET_COURSES = gql`
  {
    courses {
      _id
      name
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
