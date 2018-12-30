import React, { Component } from 'react';

import styled from 'styled-components';
import { Line } from 'rc-progress';
import star from '../../assets/images/star-circle.png';
import badge from '../../assets/images/badges.png';
import achievement from '../../assets/images/achievement.png';

class Dashboard extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-2">
                <Circle />
              </div>
              <div className="col-4">
                <h5>Rahadyan Fannani Arif</h5>
                <p>Malang, Jawa Timur</p>
                <Level>Level 5 : </Level>
                <div className="row">
                  <div className="col-5" style={{ paddingRight: '0px' }}>
                    <Line percent={20} strokeWidth="4" strokeColor="#7386D5" />
                  </div>
                  <Progress className="col-4">2130/3000</Progress>
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-4">
                    <img src={achievement} width={40} alt="" />
                  </div>
                  <div className="col-8 caption">
                    <p>Achievements</p>
                    <div className="value">11</div>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-4">
                    <img src={badge} width={40} alt="" />
                  </div>
                  <div className="col-8 caption">
                    <p>Badges</p>
                    <div className="value">11</div>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-4">
                    <img src={star} width={40} alt="" />
                  </div>
                  <div className="col-8 caption">
                    <p>Stars</p>
                    <div className="value">11</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row " style={{ marginTop: '20px' }}>
          <div className="col-8">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">My Course</h5>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Daily Target</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Circle = styled.div`
  background-color: white;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  border: 6px solid #dddddd;
  border-radius: 100px;
`;
const Progress = styled.div`
  font-size: 12px;
`;

const Level = styled.div`
  font-size: 12px;
`;

const StyledDashboard = styled(Dashboard)`
  .caption p {
    font-size: 12px;
    margin-bottom: 0px !important;
  }
  .value {
    font-weight: bold;
    margin-top: 0px;
  }
  
  .card {
    border-radius: 10px !important;
    border: 0;
  }
`;

export default StyledDashboard;
