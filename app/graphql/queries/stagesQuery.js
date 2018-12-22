import gql from 'graphql-tag';

export const GET_STAGE_BY_IDCOURSE = gql`
  query GetStageByIDCourse($courseid: ID!) {
    stages(course: $courseid) {
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
