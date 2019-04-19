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
  const [showModal, setShowModal] = useState(false);
  const [stars, setStars] = useState([]);
  const [intervalState, setIntervalState] = useState(null);
  const player = usePlayer();
  const interactive = useInteractiveCoding();
  const onSetSidebarOpen = open => {
    setSidebarOpen(open);
  };
  useEffect(
    () => {
      setShowModal(false);
      setIsPlay(true);
      player.resetTimer();
      player.reduceEnergy(player.user.userdetail._id, energyNeed);
      interval = setInterval(player.incrementTimer, 1000);
      setIntervalState(interval);
      player.setPlayerStatus(0, 3);
      player.setPlayMode(true);
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
        {({ data: { stages }, loading, error }) => {
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
              />
              <main role="main" className="container-fluid">
                <Mutation mutation={ADD_SCORE}>
                  {addScore => (
                    <SiswaCourseValidator
                      stages={stages}
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
                              initialScript={stages[0].script}
                              onExpandClick={interactive.onEditorExpandClick}
                              size={interactive.editorSize}
                              onChange={data => {
                                script = data;
                              }}
                            />
                            <SiswaCourseOutput
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
                            onClickBackdrop={() => {
                              setShowModal(false);
                            }}
                          />
                        </>
                      )}
                    </SiswaCourseValidator>
                  )}
                </Mutation>
              </main>
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
