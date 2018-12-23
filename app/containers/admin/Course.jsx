/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import { ADD_COURSE, GET_COURSES } from '../../graphql/queries/coursesQuery';

class Course extends Component {
  constructor(props) {
    super(props);
    this.createCourse = this.createCourse.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.addCourseSuccess = this.addCourseSuccess.bind(this);
    this.state = {
      showModal: false,
      redirect: false,
      idcourse: '',
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/admin/course/${this.state.idcourse}`} />;
    }
    return (
      <div>
        <div onClick={this.createCourse} className="btn btn-primary">
          Tambah Course
        </div>
        <Query query={GET_COURSES}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>DESCRIPTION</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.courses.map(course => (
                      <tr>
                        <td>{course.name}</td>
                        <td>{course.desc}</td>
                        <td>EDIT / DELETE</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal
                  visible={this.state.showModal}
                  onClickBackdrop={this.modalClosed}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Tambah Course</h5>
                  </div>

                  <Mutation mutation={ADD_COURSE}>
                    {addCourse => (
                      <Formik
                        initialValues={{ name: '', desc: '', image: null }}
                        onSubmit={(values, { setSubmitting }) => {
                          let success = this.addCourseSuccess;
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
                                <Field
                                  type="text"
                                  placeholder="name"
                                  name="name"
                                />
                                <Field
                                  type="text"
                                  placeholder="description"
                                  name="desc"
                                />
                                <input
                                  id="file"
                                  name="file"
                                  type="file"
                                  onChange={event => {
                                    setFieldValue(
                                      'image',
                                      event.currentTarget.files[0],
                                    );
                                  }}
                                  className="form-control"
                                />
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
            );
          }}
        </Query>
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

  addCourseSuccess(id) {
    this.setState({
      showModal: false,
      idcourse: id,
      redirect: true,
    });
  }
}
export default Course;
