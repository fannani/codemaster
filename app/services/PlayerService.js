import APIService from './APIService';

const addEnergy = (userid, energy) =>
  APIService.mutation(
    `addEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy,stars
        }`,
  ).then(response => response.data.data.addEnergy);

const addBadge = (userid, badge) =>
  APIService.mutation(
    `addBadgePlayer(id : "${userid}", badge: "${badge}"){
          _id,energy,badges{ _id}
        }`,
  ).then(response => response.data.data.addBadge);

const addExp = (userid, exp) => {
  return APIService.mutation(
    `addExp(userid : "${userid}", exp: ${exp}){
          _id,exp,daily_exp,level,target_exp
        }`,
  ).then(response => response.data.data.addExp);
};
const addPlayerAchievement = (player, achievement, star, point) =>
  APIService.mutation(
    `addPlayerAchievement(player : "${player}", achievement : "${achievement}" star: ${star}, point: ${point})`,
  ).then(response => response.data.data.addPlayerAchievement);

const giveAchievement = (player, achievement) =>
  APIService.mutation(
    `giveAchievement(player : "${player}", achievement : "${achievement}" ){_id}`,
  ).then(response => response.data.data.giveAchievement);

export default {
  addBadge,
  addEnergy,
  addPlayerAchievement,
  addExp,
  giveAchievement,
};
