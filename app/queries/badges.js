import gql from 'graphql-tag';

export const UPDATE_BADGE = gql`
  mutation updateBadge($id: ID, $title: String, $imageid: String, $course: ID) {
    updateBadge(id: $id, title: $title, imageid: $imageid, course: $course) {
      _id
      title
      imageid
    }
  }
`;
