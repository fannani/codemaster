import React, { Component } from "react";
import styled from "styled-components";
import classnames from "classnames";
import star from "../../assets/images/star.png";
import starOff from "../../assets/images/star-off.png";
import { Line, Circle } from 'rc-progress';


class AchievementItem extends Component {
  render() {
    return (
      <div className={classnames(this.props.className,"row")}>
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title row">
              <div className="col-7">{this.props.achievement.title}
              </div>
              <div className="col-1">
                <img width="30px"  src={ star } />
              </div>
              <div className="col-1">
                <img width="30px"  src={ star } />
              </div>
              <div className="col-1">
                <img width="30px"  src={ star } />
              </div>
              </h5>
            <p>{this.props.achievement.caption}</p>
            <div className="row">
              <div className="col-10">
            <Line percent="20" strokeWidth="4" strokeColor="#7386D5" />
              </div>
              <div className="col-2">
              1/10
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}
const StyledAchievementItem = styled(AchievementItem)`
  .card {
    width:400px;
    margin-top:10px;
    border-radius:10px !important;
    border: 0;
    margin-left:20px;
  }
`

export default StyledAchievementItem;