import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Query, graphql } from 'react-apollo';
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
import { addScore as addScoreAction } from '../../actions/scores';
import { reduceEnergy as reduceEnergyAction } from '../../actions/users';
import Output from '../../components/siswa/Output';
import ScoreBoard from '../../components/siswa/ScoreBoard';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { GET_STAGE_BY_ID } from '../../graphql/stagesQuery';

import {
  calculateStars,
  checkResult,
  compareResult,
} from '../../utils/CourseUtil';

const Course = ({
  match,
  user,
  reduceEnergy,
  currentTimer,
  addScore,
  timerText,
  tick,
  setPlayMode,
  setPlayerStatus,
  data: { stages, loading, error },
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
    const starCount = calculateStars(currentTimer, stages[0].time, life);
    if (life > 0) {
      addScore(
        user.userdetailid,
        stageid,
        stages[0].course._id,
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
      if (compare.last < stages[0].missions.length) {
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
      if (compare.all >= stages[0].missions.length) gameOver();
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
        {(function() {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Sorry! There was an error loading the items</p>;
          return (
            <>
              <div className="row flex-xl-nowrap">
                <Guide
                  visible={false}
                  title={stages[0].title}
                  teory={stages[0].teory}
                  result={result}
                  mission={stages[0].missions}
                />
                <Editor
                  checkResult={checkResult(script, stages[0].missions)}
                  script={script}
                  size={4}
                  onChange={update}
                />
                <Output />
              </div>

              <CourseFooter />
              <ToastContainer />
              <ScoreBoard
                show={showModal}
                stars={stars}
                timer={timerText}
                life={lifeResult}
                score={scoreResult}
                courseid={stages[0].course._id}
                onClickBackdrop={() => {
                  setShowModal(false);
                }}
              />
            </>
          );
        })()}
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.users.user,
  currentTimer: state.gameplay.currentTimer,
  timerText: state.gameplay.timerText,
  life: state.gameplay.life,
  score: state.gameplay.score,
});
const mapDispatchToProps = dispatch => ({
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
  currentTimer: PropTypes.number.isRequired,
  user: PropTypes.any.isRequired,
  reduceEnergy: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  timerText: PropTypes.any.isRequired,
  setPlayMode: PropTypes.func.isRequired,
  setPlayerStatus: PropTypes.func.isRequired,
};

const DataCourse = graphql(GET_STAGE_BY_ID, {
  options: props => ({
    variables: {
      id: props.match.params.stageid,
    },
  }),
})(Course);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataCourse);
