import React, { useState } from 'react';
import Modal from 'react-bootstrap4-modal';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_STAGE_BY_ID } from '../../queries/stages';
import { ADD_MISSION } from '../../queries/missions';
import Card from '../../components/UI/Card';

import UpdateForm from '../../components/admin/Stage/UpdateForm';

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

            return (
              <main className="col-12 main-container">
                <UpdateForm stage={stages[0]} />
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
