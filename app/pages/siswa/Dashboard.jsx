import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import classnames from 'classnames';
import { GET_PLAYER_DATA } from '../../queries/player';
import usePlayer from '../../hooks/player';
import Course from '../../components/siswa/Dashboard/Course';
import DailyTarget from '../../components/siswa/Dashboard/DailyTarget';
import Status from '../../components/siswa/Dashboard/Status';
import Modal from 'react-bootstrap4-modal';

const AvaItem = styled.div`
  background-color: white;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  border: 6px solid #dddddd;
  border-radius: 100px;
  margin: 10px;
`;

const Dashboard = ({ className }) => {
  const player = usePlayer();
  const [showModal, setShowModal] = useState(false);
  const handleAvaClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={classnames(className, 'container-fluid')}>
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
            <>
              <div className="row justify-content-center">
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
                      <DailyTarget
                        dailyExp={player.user.userdetail.daily_exp}
                      />
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
              </div>

              <Modal visible={showModal} onClickBackdrop={handleModalClose}>
                <div className="modal-header">
                  <h5 className="modal-title">Pilih Avatar</h5>
                </div>
                <div className="modal-body">
                  <div className="d-flex flex-row flex-wrap justify-content-center">
                    {data.players[0].avatars.map(ava => (
                      <AvaItem
                        className="p-2"
                        style={{
                          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/kodekurawal-ab777.appspot.com/o/${
                            ava.imageid
                          }?alt=media")`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Modal>
            </>
          );
        }}
      </Query>
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
