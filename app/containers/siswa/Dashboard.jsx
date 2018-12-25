import React, { Component } from 'react';
import { Query } from "react-apollo";

import CourseItem from "../../components/siswa/CourseItem";
import { BASE_URL } from "../../config/config";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (<div>

      <div className="card" >
        <div className="card-body">
          <p className="card-text">Rahadyan Fannani Arif</p>
        </div>
      </div>
    </div>)
  }
}

export default Dashboard;
