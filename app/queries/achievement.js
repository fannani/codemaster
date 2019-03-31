import gql from 'graphql-tag';

export const GET_ACHIEVEMENTS = gql`
  query getAchievements($player: ID!) {
    achievements(player: $player) {
      _id
      title
      caption
      star
      point
      target_point
    }
  }
`;

export const GET_ALL_ACHIEVEMENTS = gql`
  {
    achievements {
      _id
      title
      continuous
      detail {
        _id
        target_point
      }
    }
  }
`;

export const ADD_ACHIEVEMENT = gql`
  mutation addAchievement($title: String!, $continuous: Boolean!) {
    addAchievement(title: $title, continuous: $continuous) {
      _id
    }
  }
`;
