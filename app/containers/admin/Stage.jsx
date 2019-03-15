import React, { useState, useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { getMissionsByStage } from '../../actions/missions';
import { GET_STAGE_BY_ID, UPDATE_STAGE } from '../../graphql/stagesQuery';
import { ADD_MISSION } from '../../graphql/missionsQuery';
import Card from '../../components/Card';

const Stage = ({ getMissions, match, missions, history }) => {
  const [showModal, setShowModal] = useState(false);
  const { params } = match;
  const { stageid } = params;

  useEffect(() => {
    getMissions(stageid);
  }, []);

  const modalClosed = () => {
    setShowModal(false);
  };
  const addMission = () => {
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Stage Detail</h5>
              </div>
              <Query query={GET_STAGE_BY_ID} variables={{ id: stageid }}>
                {({ loading, error, data: { stages } }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error)
                    return <p>Sorry! There was an error loading the items</p>;
                  return (
                    <Mutation mutation={UPDATE_STAGE}>
                      {updateStage => (
                        <Formik
                          initialValues={{
                            title: stages[0].title,
                            teory: stages[0].teory,
                            time: stages[0].time,
                            image: null,
                          }}
                          onSubmit={values => {
                            const { image, title, time, teory } = values;
                            updateStage({
                              variables: {
                                file: image,
                                title,
                                time,
                                teory,
                                id: stageid,
                              },
                            }).then(({ data: { addCourse } }) => {});
                          }}
                        >
                          {({
                            isSubmitting,
                            setFieldValue,
                            handleChange,
                            values,
                          }) => (
                            <Form>
                              <div className="form-group">
                                <label htmlFor="name">Title</label>
                                <Field
                                  type="text"
                                  name="title"
                                  className="form-control"
                                  placeholder="Title"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="teory">Teory</label>
                                <textarea
                                  className="form-control"
                                  name="teory"
                                  id="teory"
                                  cols="30"
                                  rows="10"
                                  value={values.teory}
                                  onChange={handleChange}
                                  placeholder="Teory"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="teory">Time</label>
                                <Field
                                  className="form-control"
                                  type="text"
                                  name="time"
                                  placeholder="Waktu"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="file">Stage Image</label>
                                <input
                                  id="file"
                                  name="file"
                                  type="file"
                                  className="form-control-file"
                                  onChange={event => {
                                    setFieldValue(
                                      'image',
                                      event.currentTarget.files[0],
                                    );
                                  }}
                                />
                              </div>
                              <button className="btn btn-primary" type="submit">
                                Simpan
                              </button>
                            </Form>
                          )}
                        </Formik>
                      )}
                    </Mutation>
                  );
                }}
              </Query>
            </div>
          </Card>
          <Card className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Missions List</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addMission}
                >
                  Add Mission
                </button>
              </div>

              <table className="table" style={{ marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th>Quest</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {missions.map((name, index) => (
                    <tr key={index}>
                      <td>{name.quest}</td>
                      <td>{name.score}</td>
                      <td />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
      <Modal visible={showModal} onClickBackdrop={modalClosed}>
        <div className="modal-header">
          <h5 className="modal-title">Add Mission</h5>
        </div>
        <Mutation mutation={ADD_MISSION}>
          {addMission => (
            <Formik
              initialValues={{
                quest: '',
                score: 0,
              }}
              onSubmit={values => {
                addMission({
                  variables: {
                    quest: values.quest,
                    score: values.score,
                    stageid: stageid,
                  },
                }).then(({ data: { addMission: mission } }) => {
                  history.push(`/admin/mission/${mission._id}`);
                });
              }}
            >
              {() => (
                <Form>
                  <div className="modal-body">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="query">Quest</label>
                        <Field
                          type="text"
                          placeholder="quest"
                          name="quest"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="score">Score</label>
                        <Field
                          type="number"
                          className="form-control"
                          placeholder="score"
                          name="score"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Tambah
                    </button>
                    <button
                      type="button"
                      onClick={modalClosed}
                      className="btn btn-secondary"
                    >
                      Close
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      </Modal>
    </div>
  );
};
const mapStateToProps = state => ({
  missions: state.missions.missions,
  hasErrored: state.stages.hasErrored,
  isLoading: state.stages.isLoading,
  isFinish: state.stages.isFinish,
  stage: state.stages.stage,
});

const mapDispatchToProps = dispatch => ({
  getMissions: stageid => dispatch(getMissionsByStage(stageid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stage);
