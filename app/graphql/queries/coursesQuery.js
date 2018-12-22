import gql from 'graphql-tag';

export const GET_COURSES = gql`
  {
    courses {
      _id
      name
    }
  }
`;
