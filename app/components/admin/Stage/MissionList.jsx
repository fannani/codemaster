import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../UI/Card';

const MissionList = ({ onAddMission, missions }) => (
  <Card className="card" style={{ marginTop: '20px' }}>
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <h5 className="card-title">Missions List</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddMission}
        >
          Add Mission
        </button>
      </div>

      <table className="table" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Quest</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((data, index) => (
            <tr key={index}>
              <td>{data.quest}</td>
              <td>{data.score}</td>
              <td>
                <Link to={`/admin/mission/${data._id}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

export default MissionList;
