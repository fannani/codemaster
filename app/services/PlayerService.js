import APIService from './APIService';

const addEnergy = (userid, energy) =>
  APIService.mutation(
    `addEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy,stars
        }`,
  ).then(response => response.data.data.addEnergy);

const addExp = (userid, exp) => {
  return APIService.mutation(
    `addExp(userid : "${userid}", exp: ${exp}){
          _id,exp,daily_exp
        }`,
  ).then(response => response.data.data.addExp);
};
const addPlayerAchievement = (player, achievement, star, point) =>
  APIService.mutation(
    `addPlayerAchievement(player : "${player}", achievement : "${achievement}" star: ${star}, point: ${point})`,
  ).then(response => response.data.data.addPlayerAchievement);

export default {
  addEnergy,
  addPlayerAchievement,
  addExp,
};
