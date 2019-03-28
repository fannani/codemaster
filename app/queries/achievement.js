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
