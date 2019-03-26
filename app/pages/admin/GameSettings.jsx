import React from 'react';
import Card from '../../components/Card';

const GameSetting = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Level Requirement</h5>
                <button className="btn btn-primary">Add Level</button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Exp Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default GameSetting;
