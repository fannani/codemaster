import axios from 'axios';
import {
  API_BASE,
  BASE_URL
} from '../config/config';
import ApiService from './ApiService';

const login = (email, password) => {
  return axios({
      url: `${BASE_URL}auth/login`,
      method: 'post',
      data: {
        email,
        password,
      },
    })
    .then(async function(response) {
      if (response.data.user.role === 'siswa') {
        const {
          user
        } = response.data;
        return await getUserDetail(user);
      }
    })
    .then(userdetail => {
      localStorage.setItem('user', JSON.stringify(userdetail));
      return userdetail;
    });
}; 

const getUserDetail = async function(user){
  let query;

  if (user.role === 'siswa') {
    query = `players(_id:"${user.userdetailid}"){_id,address,energy,stars}`;
  }
  let result = await ApiService.query(query);
  return Object.assign(user, {
    userdetail: result.data.data.players[0]
  });

  
};

const reduceEnergy = (userid, energy) => {
  return ApiService.mutation(
    `reduceEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy
        }`,
  ).then(response => {
    return response.data.data.reduceEnergy;
  });
};

const addPlayerAchievement = (player, achievement, star, point) => {
  return ApiService.mutation(
    `addPlayerAchievement(player : "${player}", achievement : "${achievement}" star: ${star}, point: ${point})`
  ).then(response => {
    return response.data.data.addPlayerAchievement;
  });
}

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
  reduceEnergy,
  addPlayerAchievement
};