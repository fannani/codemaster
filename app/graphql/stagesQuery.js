import gql from 'graphql-tag';

export const GET_STAGE_BY_IDCOURSE = gql`
  query GetStageByIDCourse($courseid: ID!,$playerid: ID) {
    stages(course: $courseid, player :$playerid) {
      _id
      title
      time
      teory
      win
      course {
        _id
      }
    }
  }
`;

export const GET_STAGE_BY_ID = gql`
  query GetStageByID($id: ID!) {
    stages(_id: $id) {
      _id,title,time,teory,course {_id}
    }
  }
`;

export const UPDATE_STAGE = gql`
  mutation updateStage($file: Upload, $title: String!, $time: String, $id: ID! ,$teory: String) {
    updateStage(file: $file, title: $title, time: $time, id: $id, teory: $teory) {
      _id,title,time,teory,course{_id}
    }
  }
`;
