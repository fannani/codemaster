import gql from 'graphql-tag';

export const GET_COURSE_BY_PLAYER = gql`
  query GetCourseByPlayer($playerid: ID!) {
    players(_id: $playerid) {
      course {
        _id
        name
        desc
        imageid
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
  }
`;

export const ADD_BADGE_PLAYER = gql`
  mutation addBadgePlayer($id: ID!, $badge: ID!) {
    addBadgePlayer(id: $id, badge: $badge) {
      _id
      badges {
        _id
      }
    }
  }
`;
