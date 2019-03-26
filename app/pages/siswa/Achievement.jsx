import React from 'react';
import { Query } from 'react-apollo';
import classnames from 'classnames';
import styled from 'styled-components';
import { GET_ACHIEVEMENTS } from '../../queries/achievementQuery';
import SiswaAchievementItem from '../../components/siswa/Achievement/Item';
import usePlayer from '../../hooks/player';

const Achievement = () => {
  const player = usePlayer();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container" style={{ maxWidth: '1100px' }}>
          <div className="row">
            <div className="col-7">
              <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>
                Achievement
              </h2>
              <Query
                query={GET_ACHIEVEMENTS}
                variables={{ player: player.user.userdetailid }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading</div>;
                  if (error)
                    return <p>Sorry! There was an error loading the items</p>;
                  return (
                    <div>
                      {data.achievements.map(achiev => (
                        <SiswaAchievementItem
                          key={achiev._id}
                          achievement={achiev}
                        />
                      ))}
                    </div>
                  );
                }}
              </Query>
            </div>
            <div className="col-5">
              <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>Badges</h2>
              <div className={classnames('row')}>
                <Card className="card">
                  <div className="card-body">
                    <h5 className="card-title row">Judul</h5>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Card = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 10px !important;
  border: 0 !important;
  margin-left: 20px;
  height: 400px;
  margin-right: 13px;
`;

export default Achievement;
