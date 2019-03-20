/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import connect from 'react-redux/es/connect/connect';
import Card from '../../components/Card';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { ADD_STAGE } from '../../graphql/stagesQuery';
import { GET_STAGE_BY_COURSE } from '../../graphql/stagesQuery';
import { Link } from 'react-router-dom';

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
          <main className="col-12 main-container">
            <Card className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Detail Course</h5>
                  <button onClick={this.addStage} className="btn btn-primary">
                    Tambah Stage
                  </button>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                  <div className="col-12">
                    <Query
                      query={GET_STAGE_BY_COURSE}
                      variables={{
                        courseid: this.props.match.params.courseid,
                      }}
                    >
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
                                <th scope="col">TITLE</th>
                                <th scope="col">ACTION</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.stages.map(stage => (
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
                        );
                      }}
                    </Query>
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
                              <button type="submit" className="btn btn-primary">
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
