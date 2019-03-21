/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import connect from 'react-redux/es/connect/connect';
import Card from '../../components/Card';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { ADD_STAGE } from '../../graphql/stagesQuery';
import { UPDATE_COURSE } from '../../graphql/coursesQuery';
import { Link } from 'react-router-dom';
import { GET_COURSE_BYID } from '../../graphql/coursesQuery';

class StageList extends Component {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.addStage = this.addStage.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.state = {
      id: '',
      showModal: false,
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Query
            query={GET_COURSE_BYID}
            variables={{
              courseid: this.props.match.params.courseid,
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
                                  id: this.props.match.params.courseid,
                                  name,
                                  desc,
                                  script,
                                },
                              })
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
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
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
                        <button
                          onClick={this.addStage}
                          className="btn btn-primary"
                        >
                          Add Stage
                        </button>
                      </div>
                      <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-12">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">TITLE</th>
                                <th scope="col">ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              {courses[0].stages.map(stage => (
                                <tr>
                                  <td>{stage.title}</td>
                                  <td>
                                    <Link to={`/admin/stage/${stage._id}`}>
                                      Detail
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <Modal
                        visible={this.state.showModal}
                        onClickBackdrop={this.modalClosed}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title">Add Stage</h5>
                        </div>
                        <Mutation mutation={ADD_STAGE}>
                          {addStage => (
                            <Formik
                              initialValues={{
                                title: '',
                              }}
                              onSubmit={(values, { setSubmitting }) => {
                                const { title } = values;
                                const success = this.success;
                                addStage({
                                  variables: {
                                    title,
                                    course: this.props.match.params.courseid,
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
                                      onClick={this.modalClosed}
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
                  </Card>
                </main>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }

  addStage() {
    this.setState({
      showModal: true,
    });
  }

  success(id) {
    this.setState({
      id,
    });
    this.props.history.push(`/admin/stage/${this.state.id}`);
  }

  modalClosed() {
    this.setState({
      showModal: false,
    });
  }
}
const mapStateToProps = state => {
  const data = state.stages;
  return {
    hasErrored: state.stages.hasErrored,
    isLoading: state.stages.isLoading,
    isFinish: state.stages.isFinish,
  };
};

export default connect(
  mapStateToProps,
  null,
)(StageList);
