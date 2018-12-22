/* eslint-disable */
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from 'react-router-dom';
import { addCourse } from '../../actions/courses';
import gql from 'graphql-tag';

import { Mutation } from 'react-apollo';

export const UPLOAD_FILE = gql`
  mutation addCourse($file: Upload,$name: String!, $desc: String!) {
    addCourse(file: $file, name: $name, desc: $desc) {
      _id
      name
      desc
    }
  }
`;

class Course extends Component {
  constructor(props) {
    super(props);
    this.createCourse = this.createCourse.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.addCourseSuccess = this.addCourseSuccess.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      name: '',
      desc: '',
      showModal: false,
      redirect: false,
      idcourse: '',
      file: null,
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
        <Modal
          visible={this.state.showModal}
          onClickBackdrop={this.modalClosed}
        >
          <div className="modal-header">
            <h5 className="modal-title">Tambah Course</h5>
          </div>
          <div className="modal-body">
            <div className="card-body">
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="name"
                name="name"
              />
              <input
                type="text"
                value={this.state.desc}
                onChange={this.handleInputChange}
                placeholder="description"
                name="desc"
              />
              <input type="file" required onChange={this.handleImageChange} />

            </div>
          </div>
          <div className="modal-footer">
            <Mutation mutation={UPLOAD_FILE}>
              {addCourse => (
                <button
                  type="button"
                  onClick={() => {
                    let success = this.addCourseSuccess;
                    addCourse({ variables: {
                      file: this.state.file,
                      name: this.state.name,
                      desc: this.state.desc} }).then(({data : {addCourse}}) => {
                          success(addCourse._id)
                    });

                  }}
                  className="btn btn-primary"
                >
                  Tambah
                </button>
              )}
            </Mutation>
            <button
              type="button"
              onClick={this.modalClosed}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </Modal>
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
  handleImageChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    this.setState({
      file,
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
}
const mapStateToProps = state => ({
  hasErrored: state.courses.hasErrored,
  isLoading: state.courses.isLoading,
  isFinish: state.courses.isFinish,
});

const mapDispatchToProps = dispatch => ({
  add: (name, desc) => dispatch(addCourse(name, desc)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Course);
