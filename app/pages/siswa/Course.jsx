import React, { useState, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import SiswaCourseGuide from '../../components/siswa/Course/Guide';
import SiswaCourseValidator from '../../components/siswa/Course/Validator';
import SiswaCourseFooter from '../../components/siswa/Course/Footer';
import SiswaCourseEditor from '../../components/siswa/Course/Editor';
import SiswaCourseOutput from '../../components/siswa/Course/Output';
import SiswaCourseScoreBoard from '../../components/siswa/Course/ScoreBoard/ScoreBoard';
import SiswaCourseSidebar from '../../components/siswa/Course/Sidebar';
import Sidebar from 'react-sidebar';
import { GET_STAGE_BY_PLAYER } from '../../queries/stages';
import { calculateStars, checkResult } from '../../utils/course';
import PreventNavigationDialog from '../../components/PreventNavigationDialog';
import usePlayer from '../../hooks/player';
import useInteractiveCoding from '../../hooks/interactiveCoding';
import { ADD_SCORE } from '../../queries/courses';
import shortid from 'shortid';
import Modal from 'react-bootstrap4-modal';

//TODO: Output default mode

let script = '';
let interval = null;
const energyNeed = 20;
const Course = ({
  match: {
    params: { stageid },
  },
  history,
}) => {
  const [scoreResult, setScoreResult] = useState(0);
  const [lifeResult, setLifeResult] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [editorId, setEditorId] = useState(shortid.generate());
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState([]);
  const [intervalState, setIntervalState] = useState(null);
  const [showOutOfEnergy, setShowOutOfEnergy] = useState(false);
  const player = usePlayer();
  const interactive = useInteractiveCoding();
  const onSetSidebarOpen = open => {
    setSidebarOpen(open);
  };

  const reset = () => {
    setShowModal(false);
    setEditorId(shortid.generate());
    setIsPlay(true);
    player.resetTimer();
    player.addEnergy(energyNeed * -1);
    interval = setInterval(player.incrementTimer, 1000);
    setIntervalState(interval);
    player.setPlayerStatus(0, 3);
    player.setPlayMode(true);
  };
  useEffect(
    () => {
      reset();
      if (player.user.userdetail.energy - energyNeed < 0) {
        setIsPlay(false);
        setShowOutOfEnergy(true);
      }

      return () => {
        player.setPlayMode(false);
        clearInterval(interval);
      };
    },
    [stageid],
  );
  return (
    <div id="container">
      <Query
        query={GET_STAGE_BY_PLAYER}
        variables={{ id: stageid, playerid: player.user.userdetailid }}
      >
        {({ data: { stages }, loading, error, refetch }) => {
          // TODO: Pisah Stages Global
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Sorry! There was an error loading the items</p>;
          return (
            <>
              <Sidebar
                sidebar={<SiswaCourseSidebar course={stages[0].course} />}
                open={sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                styles={{
                  sidebar: { background: 'white', zIndex: '1001' },
                  overlay: { zIndex: '1000' },
                }}
              >
                <></>
              </Sidebar>
              <main role="main" className="container-fluid">
                <Mutation mutation={ADD_SCORE}>
                  {addScore => (
                    <SiswaCourseValidator
                      stages={stages}
                      life={player.gameplay.life}
                      gameOver={(score, life) => {
                        const starCount = calculateStars(
                          player.gameplay.currentTimer,
                          stages[0].time,
                          life,
                        );
                        if (life > 0) {
                          player.addExp(stages[0].exp_reward);
                          addScore({
                            variables: {
                              player: player.user.userdetailid,
                              course: stages[0].course._id,
                              stage: stageid,
                              score,
                              time: player.gameplay.currentTimer,
                              stars: starCount,
                              script,
                            },
                          });
                        }
                        setIsPlay(false);
                        setLifeResult(life);
                        setScoreResult(score);
                        setShowModal(true);
                        setStars(starCount);
                        clearInterval(intervalState);
                        if (
                          stages[0].index === stages[0].course.stages.length
                        ) {
                          player.giveAchievement('5c26270a8c56d9072422e3ee');
                          if (stages[0].course.badge) {
                            player.addBadge(stages[0].course.badge._id);
                          }
                        }
                      }}
                    >
                      {({ result }) => (
                        <>
                          <div className="row flex-xl-nowrap">
                            <SiswaCourseGuide
                              visible={false}
                              title={stages[0].title}
                              teory={stages[0].teory}
                              result={result}
                              mission={stages[0].missions}
                              show={interactive.guideShow}
                              onClick={interactive.onGuideClick}
                            />
                            <SiswaCourseEditor
                              checkResult={data =>
                                checkResult(data, stages[0].missions)
                              }
                              onClick={interactive.onEditorClick}
                              show={interactive.editorShow}
                              editorId={editorId}
                              initialScript={stages[0].script}
                              onExpandClick={interactive.onEditorExpandClick}
                              size={interactive.editorSize}
                              onReset={reset}
                              onChange={data => {
                                script = data;
                              }}
                            />
                            <SiswaCourseOutput
                              activeMode={
                                stages[0].course._id ===
                                '5cbee57ee721c733c0a428a7'
                                  ? 'console'
                                  : 'output'
                              }
                              show={interactive.outputShow}
                              onExpandClick={interactive.onOutputExpandClick}
                              onClick={interactive.onOutputClick}
                              size={interactive.outputSize}
                            />
                          </div>
                          <SiswaCourseFooter
                            course={stages[0].course}
                            stage={stages[0]}
                            history={history}
                            onMenuClick={() => {
                              onSetSidebarOpen(true);
                            }}
                          />
                          <SiswaCourseScoreBoard
                            show={showModal}
                            stars={stars}
                            timer={player.gameplay.timerText}
                            life={lifeResult}
                            score={scoreResult}
                            stage={stages[0]}
                            exp={stages[0].exp_reward}
                            onReset={() => {
                              refetch();
                              reset();
                            }}
                          />
                        </>
                      )}
                    </SiswaCourseValidator>
                  )}
                </Mutation>
              </main>

              <Modal visible={showOutOfEnergy}>
                <div className="modal-header">
                  <h5 className="modal-title">Kekurangan Energi</h5>
                </div>
                <div className="modal-body">
                  <h4>Energi anda habis, silahkan tambah energi</h4>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      history.push(`/course/${stages[0].course._id}`);
                    }}
                  >
                    OK
                  </button>
                </div>
              </Modal>

              <PreventNavigationDialog
                when={isPlay}
                title="Peringatan"
                message={
                  <strong>
                    Progress anda akan hilang, apakah anda yakin ingin keluar ?
                  </strong>
                }
                history={history}
              />
            </>
          );
        }}
      </Query>
    </div>
  );
};

Course.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

export default Course;
