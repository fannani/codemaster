/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import { ToastContainer, toast } from 'react-toastify';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import Guide from '../../components/siswa/Guide';
import Editor from '../../components/siswa/Editor';
import 'react-toastify/dist/ReactToastify.css';

import { postLog } from '../../utils/Logs';
import {
  incrementTimer,
  setPlayerStatus,
  setPlayMode,
} from '../../actions/gameplay';
import { getMissionsByStage } from '../../actions/missions';
import { stageFetchOne } from '../../actions/stages';
import Stars from '../../components/siswa/Stars';
import styled from "styled-components";
import { addScore } from '../../actions/scores';

const StyledStars = styled(Stars)`
  text-align:center;
`

class Course extends Component {
  constructor(props) {
    super(props);
    this.handleIframeTask = this.handleIframeTask.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.tick = this.tick.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      script: `<!DOCTYPE html>
<html>
    <head>
    </head>

    <body>

    </body>

</html>`,
      score: 0,
      timeText: '00:00',
      life: 3,
      result: [],
      showModal: false,
      modal: {
        title: '',
        desc: '',
      },
    };
  }

  componentDidMount() {
    const { match, fetchData, missionsFetchData } = this.props;
    const { params } = match;
    const { stageid } = params;
    fetchData(stageid);
    missionsFetchData(stageid);
    window.addEventListener('message', this.handleIframeTask);
    this.intervalHandle = setInterval(this.tick, 1000);
    this.props.setPlayerStatus(0, 3);
    this.props.setPlayMode(true);
  }
  componentWillUnmount() {
    this.props.setPlayMode(false);
  }

  tick() {
    const { tick } = this.props;
    tick();
  }

  checkResult() {
    const idoc = document.getElementById('output').contentWindow.document;
    const { script } = this.state;
    const { missions } = this.props;
    let value = script;
    value +=
      "\x3Cscript src='http://localhost:3000/js/jquery.min.js'>\x3C/script>";
    value += '\x3Cscript>result=[]\x3C/script>';
    for (let i = 0; i < missions.length; i += 1) {
      const misi = missions[i];
      value += `\x3Cscript>if(${
        misi.testcase
      }){ result.push({  "index":${i}, "result":true }) } else {result.push({  "index":${i}, "result":false })}\x3C/script>`;
    }
    value +=
      '\x3Cscript>parent.postMessage({ "action":"result", "data" : result },\'*\'); result=[]\x3C/script>';
    idoc.open();
    idoc.write(value);
    idoc.close();
  }

  handleIframeTask(e) {
    const passData = e.data;
    const { life } = this.state;
    const { missions } = this.props;
    if (passData.action === 'result') {
      let correctCount = 0;
      let correctCount2 = 0;
      let result = this.state.result;
      for (let a = 0; a < passData.data.length; a += 1) {
        if (passData.data[a].result) {
          if (typeof result[a] !== 'undefined') {
            if (!result[a].result) {
              correctCount2 += 1;
              result[a].result = true;
            }
          } else {
            result[a] = passData.data[a];
            correctCount2 += 1;
          }
          correctCount += 1;
        }
      }

      this.setState({
        result: result,
        score: correctCount * 20,
      });
      if (correctCount2 > 0) {
        postLog('misi', 'berhasil menyelesaikan misi', correctCount2);
        toast.success(`Anda berhasil menyelesaikan ${correctCount2} misi`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (life === 1) {
        this.setState({
          life: life - 1,
        });
        this.gameOver();
      } else {
        toast.error('Tidak ada jawaban yang benar', {
          position: toast.POSITION.TOP_CENTER,
        });
        this.setState({
          life: life - 1,
        });
      }
      if (correctCount >= missions.length) {
        this.gameOver();
      }
      this.props.setPlayerStatus(this.state.score, this.state.life);
    }
  }

  gameOver() {
    const { match ,user ,currentTimer,addScore} = this.props;
    const { params } = match;
    const { stageid } = params;
    clearInterval(this.intervalHandle);
    let stars = 0;
    if (this.state.life > 0) {
      stars = this.calculateStars();
      addScore(user._id,stageid, this.state.score, currentTimer, stars)
    }
    this.setState({
      showModal: true,
      stars,
    });
  }
  calculateStars() {
    let stars = 1;
    let { currentTimer, time } = this.props;
    if (currentTimer < time) stars += 1;
    if (this.state.life > 1) stars += 1;
    return stars;
  }

  update(value) {
    this.setState({
      script: value,
    });
    const idoc = document.getElementById('output').contentWindow.document;
    const { script } = this.state;
    idoc.open();
    idoc.write(script);
    idoc.close();
  }

  modalClosed() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { missions, teory, title } = this.props;
    const { result, showModal, script } = this.state;
    return (
      <div id="container">
        <main role="main" className="container-fluid">
          <div className="row flex-xl-nowrap" style={{ height: '100%' }}>
            <Guide
              title={title}
              teory={teory}
              mission={missions}
              result={result}
            />

            <Editor
              checkResult={this.checkResult}
              script={script}
              onChange={this.update}
            />

            <iframe
              title="output"
              id="output"
              style={{ backgroundColor: '#ffffff' }}
              frameBorder="0"
              className="col-sm-4"
            />
          </div>
        </main>
        <ToastContainer />
        <Modal visible={showModal} onClickBackdrop={this.modalClosed}>
          <div className="modal-header">
            <h5 className="modal-title">
              {this.state.life > 0 ? 'CONGRATULATION' : 'ANDA GAGAL COBA LAGI'}
            </h5>
          </div>
          <div className="modal-body">
            <StyledStars value={this.state.stars} />
            SCORE : {this.state.life > 0 ? this.state.score : '0'}<br />
            TIME : {this.props.timerText}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Main lagi (3)
            </button>
            <button type="button" className="btn btn-secondary">
              Kembali
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user : state.users.user,
  title: state.stages.stage.title,
  teory: state.stages.stage.teory,
  time: state.stages.stage.time,
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
  setPlayerStatus: (score, life) => dispatch(setPlayerStatus(score, life)),
  setPlayMode: play => dispatch(setPlayMode(play)),
  addScore: (userid,stageid, score, time, stars) => dispatch(addScore(userid,stageid, score, time, stars)),
});

Course.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tick: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  missionsFetchData: PropTypes.func.isRequired,
  currentTimer: PropTypes.number.isRequired,
  missions: PropTypes.arrayOf(PropTypes.object),
};

Course.defaultProps = {
  missions: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course);
