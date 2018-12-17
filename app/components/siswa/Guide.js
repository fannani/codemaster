import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import classNames from 'classnames';
import { postLog } from '../../utils/Logs';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.showTeory = this.showTeory.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.tick = this.tick.bind(this);

    this.state = {
      showModal: false,
      timer: 10,
      runtime: 10
    };
  }
  render() {
    var missionList = this.props.mission.map((misi, index) => {
      let active = false;
      if (typeof this.props.result[index] !== 'undefined') {
        active = this.props.result[index].result ? true : false;
      }
      var missionClass = classNames({
        'mission-list': true,
        'list-group-item': true,
        active: active
      });
      return (
        <li key={index} className={missionClass}>
          {misi.soal}
        </li>
      );
    });

    return (
      <div
        id="guide"
        className="col-sm"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        <div className="row">
          <div className="card col-sm-12">
            <div className="card-body">
              <h5 id="score">SCORE : {this.props.score}</h5>
              <h5 id="time">WAKTU : {this.props.time}</h5>
              <h5 id="life">LIFE : {this.props.life}</h5>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '10px' }}>
          <div className="card col-sm-12">
            <button
              type="button"
              onClick={this.showTeory}
              className="btn btn-primary"
            >
              Materi
            </button>
          </div>
        </div>
        <div className="row" style={{ marginTop: '10px' }}>
          <ul className="list-group col-sm" style={{ paddingRight: '0px' }}>
            {missionList}
          </ul>
        </div>
        <Modal
          visible={this.state.showModal}
          onClickBackdrop={this.modalClosed}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              {this.props.judul} ({this.state.runtime})
            </h5>
          </div>
          <div className="modal-body">
            <div
              className="card-body"
              dangerouslySetInnerHTML={{ __html: this.props.materi }}
            />
          </div>
          <div className="modal-footer">
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

  showTeory() {
    postLog('materi', 'membuka materi', '');
    this.setState({
      showModal: true,
      runtime: this.state.timer
    });
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  modalClosed() {
    this.setState({
      showModal: false
    });
  }

  tick() {
    let second = this.state.runtime - 1;
    if (second <= 0) {
      clearInterval(this.intervalHandle);
      this.modalClosed();
    } else {
      this.setState({
        runtime: second
      });
    }
  }
}
