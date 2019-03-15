import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import Guide from '../../components/siswa/Guide';
import CourseFooter from '../../components/siswa/CourseFooter';
import Editor from '../../components/siswa/Editor';
import 'react-toastify/dist/ReactToastify.css';
import { postLog } from '../../utils/Logs';
import {
  incrementTimer,
  setPlayerStatus as setPlayerStatusAction,
  setPlayMode as setPlayModeAction,
} from '../../actions/gameplay';
import { getMissionsByStage } from '../../actions/missions';
import { stageFetchOne } from '../../actions/stages';
import { addScore as addScoreAction } from '../../actions/scores';
import { reduceEnergy as reduceEnergyAction } from '../../actions/users';
import Output from '../../components/siswa/Output';
import ScoreBoard from '../../components/siswa/ScoreBoard';

import {
  calculateStars,
  checkResult,
  compareResult,
} from '../../utils/CourseUtil';

const Course = ({
  match,
  missions,
  fetchData,
  missionsFetchData,
  user,
  reduceEnergy,
  currentTimer,
  addScore,
  course,
  time,
  teory,
  title,
  timerText,
  tick,
  setPlayMode,
  setPlayerStatus,
}) => {
  const [script, setScript] = useState(
    `<html>
    <head>
    </head>

    <body>

    </body>
</html>`,
  );
  const [scoreResult, setScoreResult] = useState(0);
  const [lifeResult, setLifeResult] = useState(0);
  const [result, setResult] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState([]);
  const { params } = match;
  const { stageid } = params;
  let life = 3;
  let score = 0;
  const scorePoint = 20;
  const energyNeed = 20;
  let intervalHandle;

  const gameOver = () => {
    const starCount = calculateStars(currentTimer, time, life);
    if (life > 0) {
      addScore(
        user.userdetailid,
        stageid,
        course._id,
        score,
        currentTimer,
        starCount,
      );
    }
    setLifeResult(life);
    setScoreResult(score);
    setShowModal(true);
    setStars(starCount);
    clearInterval(intervalHandle);
  };

  const handleIframeTask = e => {
    const passData = e.data;
    if (passData.action === 'result') {
      const compare = compareResult(result, passData.data);
      score = compare.all * scorePoint;
      setResult(compare.result);
      setPlayerStatus(score, life);
      if (compare.last < missions.length) {
        if (compare.last > 0) {
          postLog('misi', 'berhasil menyelesaikan misi', compare.last);
          toast.success(`Anda berhasil menyelesaikan ${compare.last} misi`, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else if (life === 1) {
          life -= 1;
          gameOver();
        } else {
          toast.error('Tidak ada jawaban yang benar', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          life -= 1;
        }
      }
      if (compare.all >= missions.length) gameOver();
    }
  };

  const update = value => {
    setScript(value);
    const idoc = document.getElementById('output').contentWindow.document;
    idoc.open();
    idoc.write(value);
    idoc.close();
  };

  useEffect(() => {
    fetchData(stageid);
    missionsFetchData(stageid);
    reduceEnergy(user.userdetail._id, energyNeed);
    window.addEventListener('message', handleIframeTask);
    intervalHandle = setInterval(tick, 1000);
    setPlayerStatus(0, 3);
    setPlayMode(true);
    return () => {
      setPlayMode(false);
      window.removeEventListener('message');
      clearInterval(intervalHandle);
    };
  }, []);

  return (
    <div id="container">
      <main role="main" className="container-fluid">
        <div className="row flex-xl-nowrap">
          <Guide
            visible={false}
            title={title}
            teory={teory}
            mission={missions}
            result={result}
          />
          <Editor
            checkResult={checkResult(script, missions)}
            script={script}
            size={4}
            onChange={update}
          />
          <Output />
        </div>
        <CourseFooter />
      </main>
      <ToastContainer />
      <ScoreBoard
        show={showModal}
        stars={stars}
        timer={timerText}
        life={lifeResult}
        score={scoreResult}
        courseid={course._id}
        onClickBackdrop={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.users.user,
  title: state.stages.stage.title,
  teory: state.stages.stage.teory,
  time: state.stages.stage.time,
  course: state.stages.stage.course,
  currentTimer: state.gameplay.currentTimer,
  timerText: state.gameplay.timerText,
  courseLoading: state.stages.isLoading,
  courseError: state.stages.hasErrored,
  missionsLoading: state.missions.isLoading,
  missionsError: state.missions.hasErrored,
  missions: state.missions.missions,
  life: state.gameplay.life,
  score: state.gameplay.score,
});
const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(stageFetchOne(id)),
  missionsFetchData: id => dispatch(getMissionsByStage(id)),
  tick: () => dispatch(incrementTimer()),
  setPlayerStatus: (score, life) =>
    dispatch(setPlayerStatusAction(score, life)),
  setPlayMode: play => dispatch(setPlayModeAction(play)),
  reduceEnergy: (userid, energy) =>
    dispatch(reduceEnergyAction(userid, energy)),
  addScore: (userid, stageid, courseid, score, time, stars) =>
    dispatch(addScoreAction(userid, stageid, courseid, score, time, stars)),
});

Course.propTypes = {
  match: PropTypes.any.isRequired,
  tick: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  missionsFetchData: PropTypes.func.isRequired,
  currentTimer: PropTypes.number.isRequired,
  missions: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.any.isRequired,
  reduceEnergy: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  time: PropTypes.any.isRequired,
  teory: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  timerText: PropTypes.any.isRequired,
  setPlayMode: PropTypes.func.isRequired,
  setPlayerStatus: PropTypes.func.isRequired,
};

Course.defaultProps = {
  missions: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course);
