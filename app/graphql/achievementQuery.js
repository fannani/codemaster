import gql from 'graphql-tag';


export const GET_ACHIEVEMENTS = gql`
  query getAchievements($player: ID!) {
  courses(_player: $player){
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
`;

