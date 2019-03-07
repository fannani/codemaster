/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import connect from 'react-redux/es/connect/connect';
import { addStage } from '../../actions/stages';
import Card from '../../components/Card';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { ADD_STAGE } from '../../graphql/stagesQuery';

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
                  <h5 className="card-title">Judul Course</h5>
                  <button onClick={this.addStage} className="btn btn-primary">
                    Tambah Stage
                  </button>
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
                              course : this.props.match.params.courseid
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
