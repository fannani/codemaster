import React, { useState } from 'react';
import Modal from 'react-bootstrap4-modal';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_STAGE_BY_ID, UPDATE_STAGE } from '../../queries/stages';
import { ADD_MISSION } from '../../queries/missions';
import Card from '../../components/UI/Card';
import TextEditor from '../../components/UI/TextEditor';
import { toast } from 'react-toastify';

const Stage = ({ match, history }) => {
  const [showModal, setShowModal] = useState(false);
  const { params } = match;
  const { stageid } = params;

  const modalClosed = () => {
    setShowModal(false);
  };
  const addMission = () => {
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Query query={GET_STAGE_BY_ID} variables={{ id: stageid }}>
          {({ loading, error, data: { stages } }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            let teoryContent = EditorState.createEmpty();
            if (stages[0].teory !== null) {
              teoryContent = EditorState.createWithContent(
                convertFromRaw(JSON.parse(stages[0].teory)),
              );
            }
            return (
              <main className="col-12 main-container">
                <Card className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">Stage Detail</h5>
                    </div>

                    <Mutation mutation={UPDATE_STAGE}>
                      {updateStage => (
                        <Formik
                          initialValues={{
                            title: stages[0].title,
                            teory: teoryContent,
                            time: stages[0].time,
                            exp_reward: stages[0].exp_reward,
                            image: null,
                          }}
                          onSubmit={(
                            { image, title, time, teory, exp_reward },
                            { setSubmitting },
                          ) => {
                            const contentState = teory.getCurrentContent();
                            const raw = convertToRaw(contentState);
                            const editorJson = JSON.stringify(raw);
                            setSubmitting(true);
                            updateStage({
                              variables: {
                                file: image,
                                title,
                                time,
                                teory: editorJson,
                                exp_reward,
                                id: stageid,
                              },
                            }).then(() => {
                              setSubmitting(false);
                              toast.success('Data successfully updated');
                            });
                          }}
                        >
                          {({ setFieldValue, values }) => (
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
                              <div
                                className="form-group"
                                style={{ width: '70%' }}
                              >
                                <label htmlFor="teory">Teory</label>
                                <TextEditor
                                  value={values.teory}
                                  onChange={state => {
                                    setFieldValue('teory', state);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="teory">Time</label>
                                <Field
                                  className="form-control"
                                  type="number"
                                  name="time"
                                  placeholder="Waktu"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exp_reward">Exp Reward</label>
                                <Field
                                  className="form-control"
                                  type="number"
                                  name="exp_reward"
                                  placeholder="Exp Reward"
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
                        {stages[0].missions.map((data, index) => (
                          <tr key={index}>
                            <td>{data.quest}</td>
                            <td>{data.score}</td>
                            <td>
                              <Link to={`/admin/mission/${data._id}`}>
                                Detail
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </main>
            );
          }}
        </Query>
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
                    stageid,
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

export default Stage;
