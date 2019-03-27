import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import Modal from 'react-bootstrap4-modal';
import { Field, Form, Formik } from 'formik';
import { GET_TESTCASES, ADD_TESTCASE } from '../../queries/testcaseQuery';
import Card from '../../components/UI/Card';

const TestCase = () => {
  const [showModal, setShowModal] = useState(false);

  const createCourse = () => {
    setShowModal(true);
  };

  const modalClosed = () => {
    setShowModal(false);
  };

  const success = () => {
    setShowModal(false);
  };

  const detail = testcase => {
    return () => {
      console.log(testcase);
    };
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Test Case List</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createCourse}
                >
                  Add Test Case
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12">
                  <Query query={GET_TESTCASES}>
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
                              <th scope="col">TEST CASE</th>
                              <th style={{ width: '10%' }} scope="col">
                                ACTION
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.testcase.map(testcase => (
                              <tr>
                                <td>{testcase.caption}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn"
                                    onClick={detail(testcase)}
                                  >
                                    Detail
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    }}
                  </Query>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
      <Modal visible={showModal} onClickBackdrop={modalClosed}>
        <div className="modal-header">
          <h5 className="modal-title">Add Course</h5>
        </div>

        <Mutation mutation={ADD_TESTCASE}>
          {addTestcase => (
            <Formik
              initialValues={{
                caption: '',
                script: '',
              }}
              onSubmit={({ caption, script }) => {
                addTestcase({
                  variables: {
                    caption,
                    script,
                  },
                }).then(({ data: { addTestCase: testcase } }) => {
                  success(testcase._id);
                });
              }}
            >
              {() => (
                <Form>
                  <div className="modal-body">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="caption">Caption</label>
                        <Field
                          class="form-control"
                          type="text"
                          placeholder="Caption"
                          name="caption"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="script">Script</label>
                        <Field
                          class="form-control"
                          type="text"
                          placeholder="Script"
                          name="script"
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

export default TestCase;
