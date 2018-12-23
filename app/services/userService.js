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
    query = `{ siswa(_id:"${user.userdetailid}"){_id,address,energy}}`;
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
      return Object.assign(user, { userdetail: response.data.data.siswa[0] });
    });
};

export const testFileUpload = image => {
  let query = `mutation{ uploadFile(image:"$image"){}}`;
  console.log(image);
  var formData = new FormData();
  formData.append('image', image);
  return axios(API_BASE, formData, {
    url: API_BASE,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      query,
      variables: {
        formData,
      },
    },
  })
    .then(response => {
      return response;
    })
    .then(response => {
      return Object.assign(user, { userdetail: response.data.data.siswa[0] });
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  login,
  logout,
};
