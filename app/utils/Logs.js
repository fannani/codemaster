import axios from 'axios';

export function postLog(category, activity, value) {
  axios
    .post('localhost:3000/api/logs', {
      category: category,
      activity: activity,
      value: value
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}
