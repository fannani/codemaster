import React from 'react';
import Card from '../../components/Card';
import { GET_MISSION_BY_ID } from '../../graphql/missionsQuery';
import { Query } from 'react-apollo';
import { Formik, Field, Form } from 'formik';

const Mission = ({ match }) => {
  const { params } = match;
  const { missionid } = params;
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Mission Detail</h5>
              </div>
              <Query query={GET_MISSION_BY_ID} variables={{ id: missionid }}>
                {({ loading, error, data: { missions } }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error)
                    return <p>Sorry! There was an error loading the items</p>;
                  return (
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
                  );
                }}
              </Query>
            </div>
          </Card>
          <Card className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Test Case</h5>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="form-group">
                    <label>Testcase 0</label>
                    <div className="d-flex">
                      <span className="form-span">Belajar</span>
                      <input className="form-control short" type="text" /><span className="form-span">Adalah</span> <input className="form-control short" type="text" /> Salah satu
                    </div>
                  </div>
                </li>
                ,
              </ul>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
  // return <div>
  //
  //   <ul className="list-group">
  //     {function() {
  //       const render = [];
  //       let { testcaseCount } = this.state;
  //       for (let i = 0; i <= testcaseCount; i++) {
  //         render.push(
  //           <li className="list-group-item">
  //             <div className="form-group">
  //               <label>Testcase {i}</label>
  //               <input
  //                 key={i}
  //                 className="form-control"
  //                 type="text"
  //                 onChange={event => {
  //                   event.persist();
  //                   const testcase = values.testcase.slice();
  //                   testcase[i] = event.target.value;
  //                   setFieldValue('testcase', testcase);
  //                 }}
  //               />
  //             </div>
  //           </li>,
  //         );
  //       }
  //       return render;
  //     }.bind(this)()}
  //   </ul>
  //   <button
  //     type="button"
  //     style={{'marginTop' : '10px'}}
  //     className="btn"
  //     onClick={function() {
  //       let { testcaseCount } = this.state;
  //       testcaseCount += 1;
  //       this.setState({
  //         testcaseCount,
  //       });
  //     }.bind(this)}
  //   >
  //     Add Testcase
  //   </button>
  // </div>;
};

export default Mission;
