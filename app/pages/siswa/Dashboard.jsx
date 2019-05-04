import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import classnames from 'classnames';
import { GET_PLAYER_DATA } from '../../queries/player';
import usePlayer from '../../hooks/player';
import Course from '../../components/siswa/Dashboard/Course';
import DailyTarget from '../../components/siswa/Dashboard/DailyTarget';
import Status from '../../components/siswa/Dashboard/Status';

const Dashboard = ({ className }) => {
  const player = usePlayer();

  const handleAvaClick = () => {};

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
                <Status
                  player={player}
                  data={data}
                  onAvaClick={handleAvaClick}
                />
                <div className="row " style={{ marginTop: '20px' }}>
                  <div className="col-8">
                    <Course playerid={player.user.userdetailid} />
                  </div>
                  <div className="col-4">
                    <DailyTarget dailyExp={player.user.userdetail.daily_exp} />
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
