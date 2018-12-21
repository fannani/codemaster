import axios from 'axios';
import { API_BASE, BASE_URL } from "../config/config";
import { addMissionSuccess, missionsHasErrored, missionsIsLoading } from "../actions/missions";

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
      localStorage.setItem('user',JSON.stringify(response.data.user));
      if(response.data.user.role === 'siswa'){
        const {user} = response.data;
        return getUserDetail(user);
      }
    }).then( userdetail => {
      return userdetail;
    })

};

const getUserDetail =(user) => {
  let query;
  if(user.role === 'siswa'){
    query = `{ siswa(_id:"${user.userdetailid}"){_id,address,energy}}`;
  }
  return axios({
    url: API_BASE,
    method: 'post',
    data: {
      query,
    },
  })
    .then((response) => {
      return response;
    })
    .then(response => {
      return Object.assign(user,{userdetail : response.data.data.siswa[0]})
    })
}

const logout = () => {
  localStorage.removeItem('user');
}

export default {
  login,logout
}
