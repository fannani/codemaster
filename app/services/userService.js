import axios from 'axios';
import { API_BASE, BASE_URL } from '../config/config';

const login = (email, password) => {
  return axios({
    url: `${BASE_URL}auth/login`,
    method: 'post',
    data: {
      email,
      password,
    },
  })
    .then(response => {
      if (response.data.user.role === 'siswa') {
        const { user } = response.data;
        return getUserDetail(user);
      }
    })
    .then(userdetail => {
      localStorage.setItem('user', JSON.stringify(userdetail));

      return userdetail;
    });
};

const getUserDetail = user => {
  let query;
  if (user.role === 'siswa') {
    query = `{ player(_id:"${user.userdetailid}"){_id,address,energy}}`;
  }
  return axios({
    url: API_BASE,
    method: 'post',
    data: {
      query,
    },
  })
    .then(response => {
      return response;
    })
    .then(response => {
      return Object.assign(user, { userdetail: response.data.data.player[0] });
    });
};

const reduceEnergy = (userid, energy) => {
  return axios({
    url: API_BASE,
    method: 'post',
    data: {
      query: `mutation {
        reduceEnergy(userid : "${userid}", energy: ${energy}){
          _id,energy
        }
      }`,
    },
  })
    .then(response => {
      return response;
    })
    .then(response => {
      return response.data.data.reduceEnergy;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
  reduceEnergy
};
