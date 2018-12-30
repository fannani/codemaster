/* eslint-disable */
import React, { Component } from 'react';
import Leaderboard from '../../components/siswa/Leaderboard';
import DailyTarget from '../../components/siswa/DailyTarget';
import StageItem from '../../components/siswa/StageItem';
import {  Query } from "react-apollo";
import { GET_COURSE_BYID } from '../../graphql/coursesQuery';
import { GET_STAGE_BY_IDCOURSE  } from '../../graphql/stagesQuery';
import connect from 'react-redux/es/connect/connect';

const CourseDetail = ({ match ,user}) =>
 (
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
                    variables={{ courseid: match.params.courseid, playerid: user.userdetailid  }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading…</p>;
                      if (error)
                        return <p>Sorry! There was an error loading the items</p>;
                      let unlock = true;
                      let render = [];
                      let { stages } = data;
                      for(let i=0;i<stages.length;i++){
                         render.push( <StageItem key={stages[i]._id} stage={stages[i]} unlock={unlock}/>) 
                         unlock = stages[i].win;
                      }
                      return (
                        <div>
                          {render}
                        </div>
                      );
                    }}
                  </Query>
            </div>
            <div className="col-4">

                    <Leaderboard data={courses[0].leaderboard} />


            </div>
          </div>
        </div>
      )}}
  </Query>
);
const mapStateToProps = state => ({
  user: state.users.user,
});
export default connect(
  mapStateToProps,
  null,
)(CourseDetail);
