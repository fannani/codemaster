import React, { useState } from 'react';
import Modal, { ConfirmModal } from 'react-bootstrap4-modal';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';
import { ADD_STAGE, DELETE_STAGE } from '../../queries/stagesQuery';
import { UPDATE_COURSE, GET_COURSE_BYID } from '../../queries/coursesQuery';

const StageList = ({
  history,
  match: {
    params: { courseid },
  },
}) => {
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);
  const [delData, setDelData] = useState({});

  const addStage = () => {
    setShowModal(true);
  };

  const success = idp => {
    setId(idp);
    history.push(`/admin/stage/${idp}`);
  };

  const modalClosed = () => {
    setShowModal(false);
    setDelConfirm(false);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Query
          query={GET_COURSE_BYID}
          variables={{
            courseid,
          }}
        >
          {({ loading, error, data: { courses } }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <main className="col-12 main-container">
                <Card className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">Detail Course</h5>
                    </div>
                    <Mutation mutation={UPDATE_COURSE}>
                      {updateCourse => (
                        <Formik
                          initialValues={{
                            name: courses[0].name,
                            desc: courses[0].desc,
                            script: courses[0].script,
                          }}
                          onSubmit={(
                            { name, desc, script },
                            { setSubmitting },
                          ) => {
                            updateCourse({
                              variables: {
                                id: courseid,
                                name,
                                desc,
                                script,
                              },
                            });
                          }}
                        >
                          {() => (
                            <Form>
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Name"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="name">Description</label>
                                <Field
                                  type="text"
                                  name="desc"
                                  component="textarea"
                                  className="form-control"
                                  placeholder="Description"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="name">Script</label>
                                <Field
                                  type="text"
                                  name="script"
                                  component="textarea"
                                  className="form-control"
                                  placeholder="Script"
                                />
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Save
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
                      <h5 className="card-title">Stage List</h5>
                      <button onClick={addStage} className="btn btn-primary">
                        Add Stage
                      </button>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                      <div className="col-12">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">TITLE</th>
                              <th scope="col" style={{ width: '20%' }}>
                                ACTION
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses[0].stages.map(stage => (
                              <tr key={stage._id}>
                                <td>{stage.title}</td>
                                <td>
                                  <Link
                                    to={`/admin/stage/${stage._id}`}
                                    className="btn"
                                  >
                                    Detail
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                      setDelConfirm(true);
                                      setDelData(stage);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <Modal visible={showModal} onClickBackdrop={modalClosed}>
                      <div className="modal-header">
                        <h5 className="modal-title">Add Stage</h5>
                      </div>
                      <Mutation mutation={ADD_STAGE}>
                        {addStage => (
                          <Formik
                            initialValues={{
                              title: '',
                            }}
                            onSubmit={({ title }, { setSubmitting }) => {
                              addStage({
                                variables: {
                                  title,
                                  course: courseid,
                                },
                              }).then(({ data: { addStage } }) => {
                                success(addStage._id);
                              });
                            }}
                          >
                            {() => (
                              <Form>
                                <div className="modal-body">
                                  <div className="card-body">
                                    <div className="form-group">
                                      <label htmlFor="name">Title</label>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        placeholder="title"
                                        name="title"
                                      />
                                    </div>
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
                    <Mutation mutation={DELETE_STAGE}>
                      {deleteStage => (
                        <ConfirmModal
                          visible={delConfirm}
                          onOK={() => {
                            console.log(delData);
                            deleteStage({
                              variables: {
                                id: delData._id,
                              },
                            }).then(() => {
                              modalClosed();
                            });
                          }}
                          onCancel={modalClosed}
                        >
                          <h1>Hapus Data</h1>
                        </ConfirmModal>
                      )}
                    </Mutation>
                  </div>
                </Card>
              </main>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default StageList;
