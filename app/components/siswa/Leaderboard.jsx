import React, { Component } from "react";
import StageItem from "./StageItem";

const Leaderboard = ({data}) => {
  console.log(data);
  return(
    <div className="row" style={{ marginTop: '10px' }}>
      <div className="card" style={{ width: '100%' }}>
        <div className="card-body">
          <h5 className="card-title">Leaderboard</h5>
          <ul>
            {data.map((leader) => (
              <li key={leader._id}>{leader.player.user.name} <span>{leader.score}</span></li>            ))}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;