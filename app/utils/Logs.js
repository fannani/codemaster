import axios from 'axios';

export function postLog(category,activity,value){
    axios.post(Laravel.baseUrl+'/api/logs', {
        category: category,
        activity: activity,
        value: value
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}