import { BASE_URL } from '../config/config';

export function calculateStars(currentTimer, time, life) {
  const stars = [true, false, false];
  if (currentTimer < time) stars[1] = true;
  if (life > 1) stars[2] = true;
  return stars;
}

export function checkResult(script, missions) {
  return () => {
    const idoc = document.getElementById('output').contentWindow.document;
    let value = script;
    value += `\x3Cscript src='${BASE_URL}js/jquery.min.js'>\x3C/script>`;
    value += '\x3Cscript>result=[]\x3C/script>';
    for (let i = 0; i < missions.length; i += 1) {
      const misi = missions[i];
      value += `\x3Cscript>if(${
        misi.testcase[0]
      }){ result.push({  "index":${i}, "result":true }) } else {result.push({  "index":${i}, "result":false })}\x3C/script>`;
    }
    value +=
      '\x3Cscript>parent.postMessage({ "action":"result", "data" : result },\'*\'); result=[]\x3C/script>';
    idoc.open();
    idoc.write(value);
    idoc.close();
  };
}

export function compareResult(currentResult, result) {
  let correctCount = 0;
  let correctCount2 = 0;
  const current = currentResult;
  for (let a = 0; a < result.length; a += 1) {
    if (result[a].result) {
      if (typeof current[a] !== 'undefined') {
        if (!current[a].result) {
          correctCount2 += 1;
          current[a].result = true;
        }
      } else {
        current[a] = result[a];
        correctCount2 += 1;
      }
      correctCount += 1;
    }
  }
  return {
    result: currentResult,
    all: correctCount,
    last: correctCount2,
  };
}
