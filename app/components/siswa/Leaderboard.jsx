import React, { Component } from "react";
import styled from 'styled-components'
import classnames from 'classnames';
const Leaderboard = ({data,className}) => {
  console.log(data);
  return(
    <div className={classnames('row',className)} style={{ marginTop: '10px' }}>
      <div className="card" style={{ width: '100%' }}>
        <div className="card-body">
          <h5 className="card-title">Leaderboard</h5>
          <ol>
            {data.map((leader) => (
              <li key={leader._id}>{leader.player.user.name} <span>{leader.score}</span></li>            ))}

          </ol>
        </div>
      </div>
    </div>
  )
}
const StyledLeaderboard = styled(Leaderboard)`
h5 {
  
 }
  span {
    margin-left:30px;
  }
  ol {
    padding-inline-start:15px;
    font-size:15px;
  }
`
export default StyledLeaderboard;