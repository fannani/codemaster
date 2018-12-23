/* eslint-disable */
import React, { Component } from 'react';
import StageItem from '../../components/siswa/StageItem';
import { Query } from 'react-apollo';
import { GET_COURSE_BYID } from '../../graphql/queries/coursesQuery';
import { GET_STAGE_BY_IDCOURSE  } from '../../graphql/queries/stagesQuery';

const CourseDetail = ({ match }) => (
  <Query
    query={GET_COURSE_BYID}
    variables={{ courseid: match.params.courseid }}
  >
    {({loading, error, data : {courses} }) => {
      if (loading) return <p>Loading…</p>;
      return (
        <div>
          <div className="row">
            <h2 style={{marginLeft : '30px',fontSize:'40px'}}>{courses[0].name}</h2>
          </div>
          <div className="row">
            <div className="col-8">

                  <Query
                    query={GET_STAGE_BY_IDCOURSE}
                    variables={{ courseid: match.params.courseid }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading…</p>;
                      if (error)
                        return <p>Sorry! There was an error loading the items</p>;
                      return (
                        <div>
                          {data.stages.map(stage => (
                            <StageItem  stage={stage}/>
                          ))}
                        </div>
                      );
                    }}
                  </Query>
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
      )}}
  </Query>
);

export default CourseDetail;
