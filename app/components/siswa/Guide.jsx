/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap4-modal";
import classNames from "classnames";
import { postLog } from "../../utils/Logs";

class Guide extends Component {
  constructor(props) {
    super(props);
    this.modalClosed = this.modalClosed.bind(this);
    this.tick = this.tick.bind(this);

    this.state = {
      showModal: false,
      timer: 10,
      runtime: 10
    };
  }

  modalClosed() {
    this.setState({
      showModal: false
    });
  }

  tick() {
    const second = this.state.runtime - 1;
    if (second <= 0) {
      clearInterval(this.intervalHandle);
      this.modalClosed();
    } else {
      this.setState({
        runtime: second
      });
    }
  }

  render() {
    const missionList = this.props.mission.map((misi, index) => {
      let active = false;
      if (typeof this.props.result[index] !== "undefined") {
        active = !!this.props.result[index].result;
      }
      const missionClass = classNames({
        "mission-list": true,
        "list-group-item": true,
        active
      });
      return (
        <li key={index} className={missionClass}>
          {misi.quest}
        </li>
      );
    });

    return (
      <div
        id="guide"
        className="col-sm-4"
        style={{ height:"100%", overflowY: 'scroll', maxHeight: 'calc(100vh - 50px)' }}
      >
        {/*<div className="row">*/}
          {/*<div className="card col-sm-12">*/}
            {/*<div className="card-body">*/}
              {/*<h5 id="score">SCORE :{this.props.score}</h5>*/}
              {/*<h5 id="time">WAKTU :{this.props.time}</h5>*/}
              {/*<h5 id="life">LIFE :{this.props.life}</h5>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="card col-sm-12">
            <h3>{this.props.title}</h3><br/>
            {this.props.teory}
          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <ul className="list-group col-sm" style={{ paddingRight: "0px" }}>
            {missionList}
          </ul>
        </div>

      </div>
    );
  }
}

Guide.propTypes = {
  mission: PropTypes.array,
  title: PropTypes.string,
  teory: PropTypes.string
};

export default Guide;
