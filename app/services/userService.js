import axios from 'axios';
import { BASE_URL } from '../config/config';
import ApiService from './ApiService';

const getUserDetail = async function(user) {
  let query;
  if (user.role === 'siswa') {
    query = `players(_id:"${user.userdetailid}"){_id,address,energy,stars}`;
  }
  const result = await ApiService.query(query);
  return Object.assign(user, {
    userdetail: result.data.data.players[0],
  });
};

const login = (email, password) =>
  axios({
    url: `${BASE_URL}auth/login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .then(async response => {
      if (response.data.user.role === 'siswa') {
        const { user } = response.data;
        const detail = await getUserDetail(user);
        return detail;
      }
      throw Error('Email atau Password salah');
    })
    .then(userdetail => userdetail);

const reduceEnergy = (userid, energy) =>
  ApiService.mutation(
    `reduceEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy
        }`,
  ).then(response => response.data.data.reduceEnergy);

const addPlayerAchievement = (player, achievement, star, point) =>
  ApiService.mutation(
    `addPlayerAchievement(player : "${player}", achievement : "${achievement}" star: ${star}, point: ${point})`,
  ).then(response => response.data.data.addPlayerAchievement);

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
  reduceEnergy,
  addPlayerAchievement,
};
