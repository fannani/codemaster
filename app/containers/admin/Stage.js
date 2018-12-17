import React, { Component } from 'react';
import { stageFetchOne, updateStage } from '../../actions/stages';
import { addMission, getMissionsByStage } from '../../actions/mission';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';

class Stage extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.addMission = this.addMission.bind(this);
    this.saveMission = this.saveMission.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.state = {
      _id: '',
      title: '',
      teory: '',
      quest: '',
      testcase: '',
      score: '',
      time: '',
      showModal: false
    };
  }
  modalClosed() {
    this.setState({
      showModal: false
    });
  }
  componentDidMount() {
    this.props.getMissionsByStage(this.props.match.params.stageid);
    this.props.fetchOne(this.props.match.params.stageid).then(stage => {
      this.setState(stage);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  saveData() {
    const s = this.state;
    this.props
      .update(this.props.match.params.stageid, s.title, s.teory, s.time)
      .then(data => {});
  }
  addMission() {
    this.setState({
      showModal: true
    });
  }
  saveMission() {
    const s = this.state;
    this.props
      .addMission(this.props.match.params.stageid, s.quest, s.testcase, s.score)
      .then(() => {
        this.setState({
          showModal: false
        });
        this.props.getMissionsByStage(this.props.match.params.stageid);
      });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="title"
          onChange={this.handleInputChange}
          value={this.state.title}
          placeholder="Judul"
        />
        <br />
        <textarea
          name="teory"
          id="teory"
          cols="30"
          rows="10"
          onChange={this.handleInputChange}
          value={this.state.teory}
          placeholder="Teory"
        />
        <br />
        <input
          type="text"
          name="time"
          onChange={this.handleInputChange}
          value={this.state.time}
          placeholder="Waktu"
        />
        <br />
        <button className="btn btn-primary" onClick={this.saveData}>
          Simpan
        </button>
        <br />
        <button className="btn btn-primary" onClick={this.addMission}>
          Tambah Misi
        </button>
        <table>
          <thead>
            <tr>
              <th>Soal</th>
              <th>Skor</th>
            </tr>
          </thead>
          <tbody>
            {this.props.missions.map(function(name, index) {
              return (
                <tr key={index}>
                  <td>{name.quest}</td>
                  <td>{name.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal
          visible={this.state.showModal}
          onClickBackdrop={this.modalClosed}
        >
          <div className="modal-header">
            <h5 className="modal-title">Tambah Misi</h5>
          </div>
          <div className="modal-body">
            <div className="card-body">
              <input
                type="text"
                value={this.state.quest}
                onChange={this.handleInputChange}
                placeholder="quest"
                name="quest"
              />
              <input
                type="text"
                value={this.state.score}
                onChange={this.handleInputChange}
                placeholder="score"
                name="score"
              />
              <input
                type="text"
                value={this.state.testcase}
                onChange={this.handleInputChange}
                placeholder="testcase"
                name="testcase"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={this.saveMission}
              className="btn btn-primary"
            >
              Tambah
            </button>
            <button
              type="button"
              onClick={this.modalClosed}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    missions: state.missions.missions,
    hasErrored: state.stages.hasErrored,
    isLoading: state.stages.isLoading,
    isFinish: state.stages.isFinish
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOne: id => dispatch(stageFetchOne(id)),
    update: (id, title, teory, time) =>
      dispatch(updateStage(id, title, teory, time)),
    addMission: (stage, quest, testcase, score) =>
      dispatch(addMission(stage, quest, testcase, score)),
    getMissionsByStage: stageid => dispatch(getMissionsByStage(stageid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stage);
