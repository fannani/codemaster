export const objToParams = obj => {
  let str = '';
  for (var prop in obj) {
    str += prop + ':"' + obj[prop] + '",';
  }
  str = str.substr(0, str.length - 1);
  return str;
};
