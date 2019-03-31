import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap4-modal';
import Card from '../../components/UI/Card';
import {
  GET_ALL_ACHIEVEMENTS,
  ADD_ACHIEVEMENT,
} from '../../queries/achievement';
import Checkbox from '../../components/UI/Checkbox';

const Achievement = () => {
  const [showModal, setShowModal] = useState(false);
  const success = () => {
    setShowModal(false);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Level Requirement</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Add Achievement
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <Query query={GET_ALL_ACHIEVEMENTS}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading…</p>;
                      if (error)
                        return (
                          <p>Sorry! There was an error loading the items</p>
                        );
                      return (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Continuous</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {data.achievements.map(d => (
                              <tr>
                                <td>{d.title}</td>
                                <td>{(d.continuous) ? 'Yes' : 'No'}</td>
                                <td>
                                  <button className="btn ">Detail</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    }}
                  </Query>
                  <Modal
                    visible={showModal}
                    onClickBackdrop={() => {
                      setShowModal(false);
                    }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title">Add Achievement</h5>
                    </div>

                    <Mutation
                      mutation={ADD_ACHIEVEMENT}
                      update={(cache, { data: { addAchievement } }) => {
                        const { achievements } = cache.readQuery({
                          query: GET_ALL_ACHIEVEMENTS,
                        });
                        cache.writeQuery({
                          query: GET_ALL_ACHIEVEMENTS,
                          data: {
                            achievements: achievements.concat([addAchievement]),
                          },
                        });
                      }}
                    >
                      {addAchievement => (
                        <Formik
                          initialValues={{
                            title: '',
                            continuous: [],
                          }}
                          onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            //const { level, exp_req } = values;
                            // addPlayerLevel({
                            //   variables: {
                            //     level,
                            //     exp_req,
                            //   },
                            // }).then(({ data: { addPlayerLevel } }) => {
                            //   resetForm({
                            //     level: '',
                            //     exp_req: '',
                            //   });
                            //   success(addPlayerLevel._id);
                            // });
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <div className="modal-body">
                                <div className="card-body">
                                  <div className="form-group">
                                    <label htmlFor="name">Title</label>
                                    <Field
                                      className="form-control"
                                      type="text"
                                      placeholder="Title"
                                      name="title"
                                    />
                                  </div>
                                  <Checkbox name="continuous" value="Continuous" />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Tambah
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowModal(false);
                                  }}
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
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Achievement;
