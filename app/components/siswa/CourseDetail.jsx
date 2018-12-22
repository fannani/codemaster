/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_STAGE_BY_IDCOURSE } from '../../graphql/queries/stagesQuery';

const CourseDetail = ({ match }) => (
  <div>
    <div className="row">
      <h2>JUDUL COURSE</h2>
    </div>
    <div className="row">
      <div className="col-8">
        <div className="card">
          <div className="card-body">
            <Query
              query={GET_STAGE_BY_IDCOURSE}
              variables={{ courseid: match.params.courseid }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading…</p>;
                if (error)
                  return <p>Sorry! There was an error loading the items</p>;
                return (
                  <ul>
                    {data.stages.map(stage => (
                      <li key={stage._id}>
                        <Link to={`/play/${stage._id}`}>{stage.title}</Link>
                      </li>
                    ))}
                  </ul>
                );
              }}
            </Query>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">Daily Target</h5>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '10px' }}>
          <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">Leaderboard</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseDetail;
