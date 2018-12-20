import axios from 'axios';
import { BASE_URL } from '../config/config';

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
      console.log("MASOOOK");
      localStorage.setItem('user',JSON.stringify(response.data.user));
      return response.data.user;
    })

};

const logout = () => {
  localStorage.removeItem('user');
}

export default {
  login,logout
}
