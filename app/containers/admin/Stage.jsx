/* eslint-disable */
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';
import { stageFetchOne, updateStage } from '../../actions/stages';
import { addMission, getMissionsByStage } from '../../actions/missions';
import { Formik, Form, Field } from 'formik';
import { GET_STAGE_BY_ID } from '../../graphql/queries/stagesQuery';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_STAGE } from '../../graphql/queries/stagesQuery';

class Stage extends Component {
  constructor(props) {
    super(props);
    this.saveData = this.saveData.bind(this);
    this.addMission = this.addMission.bind(this);
    this.saveMission = this.saveMission.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.state = {
      showModal: false,
    };
  }

  modalClosed() {
    this.setState({
      showModal: false,
    });
  }

  componentDidMount() {
    this.props.getMissionsByStage(this.props.match.params.stageid);
    this.props.fetchOne(this.props.match.params.stageid).then(() => {
      this.setState(this.props.stage);
    });
  }

  saveData() {
    const s = this.state;
    this.props
      .update(this.props.match.params.stageid, s.title, s.teory, s.time)
      .then(data => {});
  }

  addMission() {
    this.setState({
      showModal: true,
    });
  }

  saveMission() {
    const s = this.state;
    this.props
      .addMission(this.props.match.params.stageid, s.quest, s.testcase, s.score)
      .then(() => {
        this.setState({
          showModal: false,
        });
        this.props.getMissionsByStage(this.props.match.params.stageid);
      });
  }

  render() {
    return (
      <div>
        <Query
          query={GET_STAGE_BY_ID}
          variables={{ id: this.props.match.params.stageid }}
        >
          {({ loading, error, data: { stages } }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <Mutation mutation={UPDATE_STAGE}>
                {updateStage => (
                  <Formik
                    initialValues={{
                      title: stages[0].title,
                      teory: stages[0].teory,
                      time: stages[0].time,
                      image: null,
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const { image, title, time, teory } = values;
                      updateStage({
                        variables: {
                          file: image,
                          title,
                          time,
                          teory,
                          id: this.props.match.params.stageid,
                        },
                      }).then(({ data: { addCourse } }) => {});
                    }}
                  >
                    {({
                      isSubmitting,
                      setFieldValue,
                      handleChange,
                      values,
                    }) => (
                      <Form>
                        <Field type="text" name="title" placeholder="Judul" />
                        <br />
                        <textarea
                          name="teory"
                          id="teory"
                          cols="30"
                          rows="10"
                          value={values.teory}
                          onChange={handleChange}
                          placeholder="Teory"
                        />
                        <br />
                        <Field type="text" name="time" placeholder="Waktu" />
                        <br />
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
                        <br />
                        <button className="btn btn-primary" type="submit">
                          Simpan
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </Mutation>
            );
          }}
        </Query>
        <br />
        <button className="btn btn-primary" onClick={this.addMission}>
          Tambah Misi
        </button>
        <table>
          <thead>
            <tr>
              <th>Soal</th>
              <th>Skor</th>
              <th>TestCase</th>
            </tr>
          </thead>
          <tbody>
            {this.props.missions.map((name, index) => (
              <tr key={index}>
                <td>{name.quest}</td>
                <td>{name.score}</td>
                <td>{name.testcase}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          visible={this.state.showModal}
          onClickBackdrop={this.modalClosed}
        >
          <div className="modal-header">
            <h5 className="modal-title">Tambah Misi</h5>
          </div>
          <Formik>
            <Form>
              <div className="modal-body">
                <div className="card-body">
                  <Field
                    type="text"
                    value={this.state.quest}
                    placeholder="quest"
                    name="quest"
                  />
                  <Field
                    type="text"
                    value={this.state.score}
                    placeholder="score"
                    name="score"
                  />
                  <input
                    type="text"
                    value={this.state.testcase}
                    placeholder="testcase"
                    name="testcase"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={this.saveMission}
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
          </Formik>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  missions: state.missions.missions,
  hasErrored: state.stages.hasErrored,
  isLoading: state.stages.isLoading,
  isFinish: state.stages.isFinish,
  stage: state.stages.stage,
});

const mapDispatchToProps = dispatch => ({
  fetchOne: id => dispatch(stageFetchOne(id)),
  update: (id, title, teory, time) =>
    dispatch(updateStage(id, title, teory, time)),
  addMission: (stage, quest, testcase, score) =>
    dispatch(addMission(stage, quest, testcase, score)),
  getMissionsByStage: stageid => dispatch(getMissionsByStage(stageid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stage);
