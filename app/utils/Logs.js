/*eslint-disable*/
import axios from 'axios';

export function postLog(category, activity, value) {
  axios
    .post('localhost:3000/api/logs', {
      category,
      activity,
      value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
