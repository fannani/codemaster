import React, { Component } from "react";
import styled from "styled-components";
import classnames from "classnames";

class AchievementItem extends Component {
  render() {
    return (
      <div className={classnames(this.props.className,"row")}>
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title">{this.props.achievement.title}</h5>

          </div>
        </div>
      </div>
    );
  }
}
const StyledAchievementItem = styled(AchievementItem)`
  .card {
    width:300px;
    margin-top:10px;
    border-radius:10px !important;
    border: 0;
    margin-left:20px;
  }
`

export default StyledAchievementItem;