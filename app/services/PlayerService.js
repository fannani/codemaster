import APIService from './APIService';

const reduceEnergy = (userid, energy) =>
  APIService.mutation(
    `reduceEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy
        }`,
  ).then(response => response.data.data.reduceEnergy);

const addPlayerAchievement = (player, achievement, star, point) =>
  APIService.mutation(
    `addPlayerAchievement(player : "${player}", achievement : "${achievement}" star: ${star}, point: ${point})`,
  ).then(response => response.data.data.addPlayerAchievement);

export default {
  reduceEnergy,
  addPlayerAchievement,
};
