import React from 'react';
import styled from 'styled-components';
import { Line, Circle } from 'rc-progress';
import { Query } from 'react-apollo';
import ContentLoader from 'react-content-loader';
import classnames from 'classnames';
import star from '../../assets/images/star-circle.png';
import badge from '../../assets/images/badges.png';
import achievement from '../../assets/images/achievement.png';
import { GET_COURSE_BY_PLAYER, GET_PLAYER_DATA } from '../../queries/player';
import Card from '../../components/UI/Card';
import CourseItem from '../../components/siswa/Course/List/Item';
import usePlayer from '../../hooks/player';

const Loader = () => {
  const all = [];
  for (let i = 0; i < 6; i += 1) {
    const content = (
      <Card
        key={i}
        className="card m-2"
        style={{
          width: '200px',
          height: '250px',
          borderRadius: '10px !important',
          border: '0',
        }}
      >
        <ContentLoader width={200} height={250}>
          <circle cx="100" cy="80" r="60" />
          <rect x="20" y="160" rx="4" ry="4" width="160" height="15" />
          <rect x="20" y="185" rx="4" ry="4" width="160" height="15" />
          <rect x="20" y="210" rx="4" ry="4" width="130" height="15" />
        </ContentLoader>
      </Card>
    );
    all.push(content);
  }
  return (
    <div>
      <div className="d-flex flex-wrap">{all}</div>
    </div>
  );
};

const Dashboard = ({ className }) => {
  const player = usePlayer();

  return (
    <div className={classnames(className, 'container-fluid')}>
      <div className="row justify-content-center">
        <Query
          query={GET_PLAYER_DATA}
          variables={{
            player: player.user.userdetail._id,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <p>Terjadi Kesalahan</p>;

            return (
              <main
                className="col-12 main-container"
                style={{ maxWidth: '1100px' }}
              >
                <Card className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-2">
                        <Ava />
                      </div>
                      <div className="col-4">
                        <h5>{player.user.name}</h5>
                        <p>Malang, Jawa Timur</p>
                        <Level>Level {player.user.userdetail.level} : </Level>
                        <div className="row">
                          <div
                            className="col-5"
                            style={{ paddingRight: '0px' }}
                          >
                            <Line
                              percent={
                                (player.user.userdetail.exp /
                                  player.user.userdetail.target_exp) *
                                100
                              }
                              strokeWidth="4"
                              strokeColor="#7386D5"
                            />
                          </div>
                          <Progress className="col-4">
                            {player.user.userdetail.exp}/
                            {player.user.userdetail.target_exp}
                          </Progress>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="row">
                          <div className="col-4">
                            <img src={achievement} width={40} alt="" />
                          </div>
                          <div className="col-8 caption">
                            <p>Achievements</p>
                            <div className="value">
                              {data.players[0].achievement_total}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="row">
                          <div className="col-4">
                            <img src={badge} width={40} alt="" />
                          </div>
                          <div className="col-8 caption">
                            <p>Badges</p>
                            <div className="value">
                              {data.players[0].badges.length}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="row">
                          <div className="col-4">
                            <img src={star} width={40} alt="" />
                          </div>
                          <div className="col-8 caption">
                            <p>Stars</p>
                            <div className="value">
                              {player.user.userdetail.stars
                                ? player.user.userdetail.stars
                                : 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="row " style={{ marginTop: '20px' }}>
                  <div className="col-8">
                    <Card className="card ">
                      <div className="card-body">
                        <h5 className="card-title">My Course</h5>
                        <Query
                          query={GET_COURSE_BY_PLAYER}
                          variables={{ playerid: player.user.userdetailid }}
                        >
                          {({ loading, error, data }) => {
                            if (loading) return <Loader />;
                            if (error) return <p />;
                            return (
                              <div className="d-flex flex-wrap">
                                {data.players[0].course.map(course => (
                                  <CourseItem key={course._id} item={course} />
                                ))}
                              </div>
                            );
                          }}
                        </Query>
                      </div>
                    </Card>
                  </div>
                  <div className="col-4">
                    <Card className="card ">
                      <div className="card-body">
                        <h5 className="card-title">Daily Target</h5>
                        <div className="row justify-content-center">
                          <div className="col-9">
                            <Circle
                              percent={
                                (player.user.userdetail.daily_exp / 300) * 100
                              }
                              strokeWidth="4"
                              strokeColor="#7386D5"
                            />
                            <p className="xp-caption">
                              <span>
                                {player.user.userdetail.daily_exp}/300
                              </span>
                              <br />
                              XP Diperoleh
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    {/*<Card className="card " style={{ marginTop: '20px' }}>*/}
                    {/*  <div className="card-body">*/}
                    {/*    <h5 className="card-title">Friends</h5>*/}
                    {/*    <div className="row justify-content-center">*/}
                    {/*      <div className="col-9" />*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</Card>*/}
                  </div>
                </div>
              </main>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

const Ava = styled.div`
  background-color: white;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  border: 6px solid #dddddd;
  border-radius: 100px;
`;
const Progress = styled.div`
  font-size: 12px;
`;

const Level = styled.div`
  font-size: 12px;
`;

const StyledDashboard = styled(Dashboard)`
  .caption p {
    font-size: 12px;
    margin-bottom: 0px !important;
  }
  .value {
    font-weight: bold;
    margin-top: 0px;
  }

  .xp-caption span {
    color: #ffc149;
    font-weight: bold;
    margin-bottom: 0px;
    font-size: 30px;
  }
  .xp-caption {
    text-align: center;
    position: absolute;
    top: 60px;
    width: 87%;
  }
`;

export default StyledDashboard;
