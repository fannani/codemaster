import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Guide from '../../components/siswa/Guide';
import CourseValidator from '../../components/siswa/CourseValidator';
import CourseFooter from '../../components/siswa/CourseFooter';
import Editor from '../../components/siswa/Editor';
import 'react-toastify/dist/ReactToastify.css';
import {
  resetTimer as resetTimerAction,
  incrementTimer,
  setPlayerStatus as setPlayerStatusAction,
  setPlayMode as setPlayModeAction,
} from '../../actions/gameplay';
import { addScore as addScoreAction } from '../../actions/scores';
import { reduceEnergy as reduceEnergyAction } from '../../actions/users';
import Output from '../../components/siswa/Output';
import ScoreBoard from '../../components/siswa/ScoreBoard';
import { GET_STAGE_BY_ID } from '../../queries/stagesQuery';
import { calculateStars, checkResult } from '../../utils/CourseUtil';
import PreventNavigationDialog from '../../components/PreventNavigationDialog';

const Course = ({
  match: {
    params: { stageid },
  },
  user,
  reduceEnergy,
  currentTimer,
  addScore,
  timerText,
  tick,
  setPlayMode,
  setPlayerStatus,
  resetTimer,
  history,
}) => {
  const [scoreResult, setScoreResult] = useState(0);
  const [lifeResult, setLifeResult] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState([]);
  const [intervalState, setIntervalState] = useState(null);
  const [guideShow, setGuideShow] = useState(true);
  const [outputShow, setOutputShow] = useState(true);
  const [editorSize, setEditorSize] = useState(4);
  const [outputSize, setOutputSize] = useState(4);
  const [editorShow, setEditorShow] = useState(true);
  let interval = null;
  const energyNeed = 20;

  const gameOver = (stage, score, life) => {
    const starCount = calculateStars(currentTimer, stage.time, life);
    if (life > 0) {
      addScore(
        user.userdetailid,
        stageid,
        stage.course._id,
        score,
        currentTimer,
        starCount,
      );
    }
    setLifeResult(life);
    setScoreResult(score);
    setShowModal(true);
    setStars(starCount);
    clearInterval(intervalState);
  };

  const onEditorExpandClick = () => {
    if (editorSize < 10) {
      setGuideShow(false);
      setOutputShow(false);
      setEditorSize(10);
      setOutputSize(4);
    } else {
      setGuideShow(true);
      setOutputShow(true);
      setEditorSize(4);
    }
  };

  const onOutputExpandClick = () => {
    if (outputSize < 10) {
      setGuideShow(false);
      setEditorShow(false);
      setOutputSize(10);
      setEditorSize(4);
    } else {
      setGuideShow(true);
      setEditorShow(true);
      setOutputSize(4);
    }
  };

  const onOutputClick = () => {
    if (!outputShow) {
      setOutputShow(true);
      setOutputSize(4);
      setEditorSize(editorSize - 3);
    }
  };
  const onEditorClick = () => {
    if (!editorShow) {
      setEditorShow(true);
      setEditorSize(4);
      setOutputSize(outputSize - 3);
    }
  };
  const onGuideClick = () => {
    if (!guideShow) {
      setGuideShow(true);
      if (editorSize >= 7) {
        setEditorSize(editorSize - 3);
      }
      if (outputSize >= 7) {
        setOutputSize(outputSize - 3);
      }
    }
  };

  useEffect(() => {
    resetTimer();
    reduceEnergy(user.userdetail._id, energyNeed);
    interval = setInterval(tick, 1000);
    setIntervalState(interval);
    setPlayerStatus(0, 3);
    setPlayMode(true);

    return () => {
      setPlayMode(false);
      clearInterval(interval);
    };
  }, []);
  return (
    <div id="container">
      <main role="main" className="container-fluid">
        <Query query={GET_STAGE_BY_ID} variables={{ id: stageid }}>
          {({ data: { stages }, loading, error }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <CourseValidator stages={stages} gameOver={gameOver}>
                {({ result }) => (
                  <>
                    <div className="row flex-xl-nowrap">
                      <Guide
                        visible={false}
                        title={stages[0].title}
                        teory={stages[0].teory}
                        result={result}
                        mission={stages[0].missions}
                        show={guideShow}
                        onClick={onGuideClick}
                      />
                      <Editor
                        checkResult={script =>
                          checkResult(script, stages[0].missions)
                        }
                        onClick={onEditorClick}
                        show={editorShow}
                        initialScript={stages[0].course.script}
                        onExpandClick={onEditorExpandClick}
                        size={editorSize}
                      />
                      <Output
                        show={outputShow}
                        onExpandClick={onOutputExpandClick}
                        onClick={onOutputClick}
                        size={outputSize}
                      />
                    </div>
                    <CourseFooter />
                    <ToastContainer />
                    <ScoreBoard
                      show={showModal}
                      stars={stars}
                      timer={timerText}
                      life={lifeResult}
                      score={scoreResult}
                      stage={stages[0]}
                      onClickBackdrop={() => {
                        setShowModal(false);
                      }}
                    />
                  </>
                )}
              </CourseValidator>
            );
          }}
        </Query>
      </main>
      <PreventNavigationDialog
        when={true}
        title="Peringatan"
        message={
          <strong>
            Progress anda akan hilang, apakah anda yakin ingin keluar ?
          </strong>
        }
        history={history}
      />{' '}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.users.user,
  currentTimer: state.gameplay.currentTimer,
  timerText: state.gameplay.timerText,
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
  resetTimer: () => dispatch(resetTimerAction()),
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
  resetTimer: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course);
