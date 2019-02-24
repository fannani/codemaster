import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import connect from 'react-redux/es/connect/connect';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Leaderboard from '../../components/siswa/Leaderboard';
import StageItem from '../../components/siswa/StageItem';
import { GET_COURSE_BYID } from '../../graphql/coursesQuery';
import { GET_STAGE_BY_IDCOURSE } from '../../graphql/stagesQuery';

const CourseDetail = ({ match, user, className }) => (
  <Query
    query={GET_COURSE_BYID}
    variables={{ courseid: match.params.courseid }}
  >
    {({ loading, data: { courses } }) => {
      if (loading) return <p>Loading…</p>;
      return (
        <div className={classnames(className, 'container-fluid')}>
          <div className="row justify-content-center">
            <main
              className="col-12 main-container"
              style={{ maxWidth: '1100px' }}
            >
              <div>
                <div className="row">
                  <div className="col-8">
                    <div className="row">
                      <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>
                        {courses[0].name}
                      </h2>
                    </div>
                    <div
                      className="card"
                      style={{
                        marginTop: '10px',
                        paddingLeft: '30px',
                        paddingBottom: '100px',
                      }}
                    >
                      <Query
                        query={GET_STAGE_BY_IDCOURSE}
                        variables={{
                          courseid: match.params.courseid,
                          playerid: user.userdetailid,
                        }}
                      >
                        {({ loading: loadingStage, error, data }) => {
                          if (loadingStage) return <p>Loading…</p>;
                          if (error)
                            return (
                              <p>Sorry! There was an error loading the items</p>
                            );
                          let unlock = true;
                          const render = [];
                          const { stages } = data;
                          for (let i = 0; i < stages.length; i += 1) {
                            render.push(
                              <StageItem
                                key={stages[i]._id}
                                stage={stages[i]}
                                unlock={unlock}
                              />,
                            );
                            unlock = stages[i].win;
                          }
                          return <div>{render}</div>;
                        }}
                      </Query>
                    </div>
                  </div>
                  <div className="col-4">
                    <Leaderboard data={courses[0].leaderboard} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }}
  </Query>
);

CourseDetail.propTypes = {
  match: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
  className: PropTypes.any.isRequired,
};

const StyledCourseDetail = styled(CourseDetail)`
  .card {
    border-radius: 10px !important;
    border: 0;
  }
`;
const mapStateToProps = state => ({
  user: state.users.user,
});
export default connect(
  mapStateToProps,
  null,
)(StyledCourseDetail);
