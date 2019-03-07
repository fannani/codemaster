import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import { Formik, Form, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { ADD_COURSE, GET_COURSES } from '../../graphql/coursesQuery';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';

class Course extends Component {
  constructor(props) {
    super(props);
    this.createCourse = this.createCourse.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.success = this.success.bind(this);
    this.state = {
      showModal: false,
      idcourse: '',
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
                  <h5 className="card-title">Course</h5>
                  <button
                    onClick={this.createCourse}
                    className="btn btn-primary"
                  >
                    Add Course
                  </button>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                  <div className="col-12">
                    <Query query={GET_COURSES}>
                      {({ loading, error, data }) => {
                        if (loading) return <p>Loading…</p>;
                        if (error)
                          return (
                            <p>Sorry! There was an error loading the items</p>
                          );
                        return (
                          <div>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">TITLE</th>
                                  <th scope="col">DESCRIPTION</th>
                                  <th scope="col">ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.courses.map(course => (
                                  <tr>
                                    <td>{course.name}</td>
                                    <td>{course.desc}</td>
                                    <td>
                                      <Link to={`/admin/course/${course._id}`}>
                                        Detail
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <Modal
                              visible={this.state.showModal}
                              onClickBackdrop={this.modalClosed}
                            >
                              <div className="modal-header">
                                <h5 className="modal-title">Add Course</h5>
                              </div>

                              <Mutation mutation={ADD_COURSE}>
                                {addCourse => (
                                  <Formik
                                    initialValues={{
                                      name: '',
                                      desc: '',
                                      image: null,
                                    }}
                                    onSubmit={values => {
                                      const success = this.success;
                                      const { image, name, desc } = values;
                                      addCourse({
                                        variables: {
                                          file: image,
                                          name,
                                          desc,
                                        },
                                      }).then(({ data: { addCourse } }) => {
                                        success(addCourse._id);
                                      });
                                    }}
                                  >
                                    {({ isSubmitting, setFieldValue }) => (
                                      <Form>
                                        <div className="modal-body">
                                          <div className="card-body">
                                            <div className="form-group">
                                              <label htmlFor="name">Name</label>
                                              <Field
                                                class="form-control"
                                                type="text"
                                                placeholder="name"
                                                name="name"
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="desc">
                                                Description
                                              </label>
                                              <Field
                                                class="form-control"
                                                type="text"
                                                placeholder="description"
                                                name="desc"
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="file">
                                                Course Image
                                              </label>
                                              <input
                                                id="file"
                                                name="file"
                                                type="file"
                                                onChange={event => {
                                                  setFieldValue(
                                                    'image',
                                                    event.currentTarget
                                                      .files[0],
                                                  );
                                                }}
                                                className="form-control-file"
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
                        );
                      }}
                    </Query>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  createCourse() {
    this.setState({
      showModal: true,
    });
  }

  modalClosed() {
    this.setState({
      showModal: false,
    });
  }

  success(id) {
    this.setState({
      showModal: false,
      idcourse: id,
    });
    this.props.history.push(`/admin/course/${this.state.idcourse}`);
  }
}
export default Course;
