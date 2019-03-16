import React, { useState } from 'react';
import Modal from 'react-bootstrap4-modal';
import { Query } from 'react-apollo';
import { Formik, Field, Form, FieldArray } from 'formik';
import Card from '../../components/Card';
import { GET_MISSION_BY_ID } from '../../graphql/missionsQuery';
import { GET_TESTCASES } from '../../graphql/testcaseQuery';

const Mission = ({ match }) => {
  const { params } = match;
  const { missionid } = params;
  const [showModal, setShowModal] = useState(false);
  const [showModalTestCase, setShowModalTestCase] = useState(false);
  const [testCase, setTestCase] = useState({ caption: '', script: '' });

  const createTestCase = () => {
    setShowModal(true);
  };

  const modalClosed = () => {
    setShowModal(false);
    setShowModalTestCase(false);
  };

  const choose = testcase => () => {
    setTestCase(testcase);
    setShowModal(false);
    setShowModalTestCase(true);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Query query={GET_MISSION_BY_ID} variables={{ id: missionid }}>
            {({ loading, error, data: { missions } }) => {
              if (loading) return <p>Loading…</p>;
              if (error)
                return <p>Sorry! There was an error loading the items</p>;
              return (
                <>
                  <Card className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">Mission Detail</h5>
                      </div>

                      <Formik
                        initialValues={{
                          quest: missions[0].quest,
                          score: missions[0].score,
                        }}
                      >
                        {() => (
                          <Form>
                            <div className="form-group">
                              <label htmlFor="name">Quest</label>
                              <Field
                                type="text"
                                name="quest"
                                className="form-control"
                                placeholder="Quest"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Score</label>
                              <Field
                                type="text"
                                name="score"
                                className="form-control"
                                placeholder="Score"
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Card>
                  <Card className="card" style={{ marginTop: '20px' }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">Test Case</h5>
                        <button
                          type="button"
                          onClick={createTestCase}
                          className="btn btn-primary"
                        >
                          Add Test Case
                        </button>
                      </div>
                      <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-12">
                          <ul className="list-group">
                            <li className="list-group-item">
                              <div className="form-group">
                                <label>Testcase 0</label>
                                <div className="d-flex">
                                  <span className="form-span">Belajar</span>
                                  <input
                                    className="form-control short"
                                    type="text"
                                  />
                                  <span className="form-span">Adalah</span>{' '}
                                  <input
                                    className="form-control short"
                                    type="text"
                                  />{' '}
                                  Salah satu
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              );
            }}
          </Query>
        </main>
      </div>
      <Modal visible={showModal} onClickBackdrop={modalClosed}>
        <div className="modal-header">
          <h5 className="modal-title">Add Test Case</h5>
        </div>

        <div className="modal-body">
          <div className="card-body">
            <Query query={GET_TESTCASES}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading…</p>;
                if (error)
                  return <p>Sorry! There was an error loading the items</p>;
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
                              onClick={choose(testcase)}
                            >
                              Choose
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
      </Modal>

      <Modal
        dialogClassName="modal-lg"
        visible={showModalTestCase}
        onClickBackdrop={modalClosed}
      >
        <div className="modal-header">
          <h5 className="modal-title">Add Test Case</h5>
        </div>

        <Formik
          initialValues={{ params: [] }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {() => {
            const render = [];
            let testCaseCap = testCase.caption;
            let start;
            let end;
            let index;
            let text;
            let i = 0;
            do {
              start = testCaseCap.indexOf('$$');
              if (start !== -1) {
                end = testCaseCap.indexOf('$$', start + 2);
                index = testCaseCap.substring(start + 2, end);
                text = testCaseCap.substring(0, start);
                testCaseCap = testCaseCap.substring(
                  end + 2,
                  testCaseCap.length,
                );
                render.push(
                  <span className="form-span">{text}</span>,
                  <Field
                    className="form-control short"
                    type="text"
                    name={`params.${i}`}
                    placeholder={index}
                  />,
                );
              } else {
                render.push(<span className="form-span">{testCaseCap}</span>);
              }
              i += 1;
            } while (start !== -1);
            return (
              <Form>
                <div className="modal-body">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="d-flex">{render}</div>
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
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default Mission;
