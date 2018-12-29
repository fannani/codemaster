/* eslint-disable */
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-bootstrap4-modal';
import {  updateStage } from '../../actions/stages';
import { getMissionsByStage } from '../../actions/missions';
import { Formik, Form, Field } from 'formik';
import { GET_STAGE_BY_ID } from '../../graphql/stagesQuery';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_STAGE } from '../../graphql/stagesQuery';
import { ADD_MISSION } from '../../graphql/missionsQuery';

class Stage extends Component {
  constructor(props) {
    super(props);
    this.saveData = this.saveData.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.state = {
      showModal: false,
      testcaseCount: 0,
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
            </tr>
          </thead>
          <tbody>
            {this.props.missions.map((name, index) => (
              <tr key={index}>
                <td>{name.quest}</td>
                <td>{name.score}</td>
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
          <Mutation mutation={ADD_MISSION}>
            {addMission => (
              <Formik
                initialValues={{
                  quest: '',
                  score: 0,
                  testcase: [],
                }}
                onSubmit={(values, { setSubmitting }) => {
                  addMission({
                    variables: {
                      quest: values.quest,
                      testcase: values.testcase,
                      score: values.score,
                      stageid: this.props.match.params.stageid,
                    },
                  }).then(() => {});
                }}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="card-body">
                        <Field type="text" placeholder="quest" name="quest" />
                        <Field type="number" placeholder="score" name="score" />
                        <div>
                          <button
                            type="button"
                            onClick={function() {
                              let { testcaseCount } = this.state;
                              testcaseCount++;
                              this.setState({
                                testcaseCount: testcaseCount,
                              });
                            }.bind(this)}
                          >
                            Tambah Testcase
                          </button>
                          {function() {
                            let render = [];
                            for (
                              let i = 0;
                              i <= this.state.testcaseCount;
                              i++
                            ) {
                              render.push(
                                <input
                                  key={i}
                                  type="text"
                                  onChange={event => {
                                    event.persist();
                                    let testcase = values.testcase.slice();
                                    testcase[i] = event.target.value;
                                    setFieldValue('testcase', testcase);
                                  }}
                                />,
                              );
                            }
                            return render;
                          }.bind(this)()}
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
  update: (id, title, teory, time) =>
    dispatch(updateStage(id, title, teory, time)),
  getMissionsByStage: stageid => dispatch(getMissionsByStage(stageid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stage);
