/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import { ToastContainer, toast } from 'react-toastify';
import AceEditor from 'react-ace';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import Guide from '../../components/siswa/Guide';
import 'react-toastify/dist/ReactToastify.css';
import 'brace/mode/html';
import 'brace/theme/monokai';
import { postLog } from '../../utils/Logs';
import { incrementTimer, setPlayerStatus, setPlayMode } from '../../actions/gameplay';
import { getMissionsByStage } from '../../actions/mission';
import { stageFetchOne } from '../../actions/stages';

class Course extends Component {
  constructor(props) {
    super(props);
    this.handleIframeTask = this.handleIframeTask.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.tick = this.tick.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      initscript: `<!DOCTYPE html>
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
    console.log("HAHAHAHA");
    this.props.setPlayerStatus(0,3);
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
    const { initscript } = this.state;
    let value = initscript;
    const { missions } = this.props;
    value += "\x3Cscript src='localhost:3000/js/jquery.min.js'>\x3C/script>";
    value += '\x3Cscript>result=[]\x3C/script>';
    for (let i = 0; i < missions.length; i += 1) {
      const misi = missions[i];
      value
        += `\x3Cscript>if(${
          misi.testcase
        }){ result.push({  "index":${
          i
        }, "result":true }) } else {result.push({  "index":${
          i
        }, "result":false })}\x3C/script>`;
    }
    value
      += '\x3Cscript>parent.postMessage({ "action":"result", "data" : result },\'*\'); result=[]\x3C/script>';
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
      const result2 = [];
      let i = 0;
      const { result } = this.state;
      for (let a = 0; i < passData.data.length; a += 1) {
        result.push(passData.data[a]);
        if (passData.data[a].result) {
          if (typeof result[i] !== 'undefined') {
            if (!result[i].result) {
              correctCount2 += 1;
            }
          } else {
            correctCount2 += 1;
          }
          correctCount += 1;
        }
        i += 1;
      }

      this.setState({
        result: result2,
        score: correctCount * 20,
      });
      if (correctCount2 > 0) {
        postLog('misi', 'berhasil menyelesaikan misi', correctCount2);
        toast.success(
          `Anda berhasil menyelesaikan ${correctCount2} misi`,
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
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
        this.showResult();
      }
      this.props.setPlayerStatus( this.state.score, this.state.life);
    }

  }

  gameOver() {
    this.setState({
      showModal: true,
    });
  }

  showResult() {
    this.setState({
      showModal: true,
    });
  }

  update(value) {
    this.setState({
      initscript: value,
    });
    const idoc = document.getElementById('output').contentWindow.document;
    const { initscript } = this.state;
    idoc.open();
    idoc.write(initscript);
    idoc.close();
  }

  modalClosed() {
    this.setState({
      showModal: false,
    });
  }


  render() {
    const { missions, teory, title } = this.props;
    const {
      result, showModal, modal, initscript,
    } = this.state;
    return (
      <div id="container">
        <main
          role="main"
          className="container-fluid"
          style={{ height: '100%' }}
        >
          <div className="row flex-xl-nowrap" style={{ height: '100%' }}>
            <Guide
              title={title}
              teory={teory}
              mission={missions}
              result={result}
            />
            <div className="col-sm-4" style={{ height: 'calc(100vh - 50px)' }}>
              <div style={{ height: "50px" }}>
                <button
                  type="button"
                  id="run"
                  onClick={this.checkResult}
                  className="btn btn-primary"
                >
                  Periksa
                </button>
              </div>
              <AceEditor
                mode="html"
                theme="monokai"
                value={initscript}
                width="100%"
                style={{ height: "calc(100% - 50px)" }}
                setOptions={{
                  fontSize: '16pt',
                  vScrollBarAlwaysVisible: true,
                }}
                onChange={this.update}
              />
            </div>
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
        <Modal
          visible={showModal}
          onClickBackdrop={this.modalClosed}
        >
          <div className="modal-header">
            <h5 className="modal-title">{modal.title}</h5>
          </div>
          <div className="modal-body">
            <div className="card-body">{modal.desc}</div>
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
  title: state.stages.stage.title,
  teory: state.stages.stage.teory,
  time: state.stages.stage.time,
  currentTimer: state.gameplay.currentTimer,
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
  setPlayerStatus: (score,life) => dispatch(setPlayerStatus(score,life)),
  setPlayMode: (play) => dispatch(setPlayMode(play))
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
