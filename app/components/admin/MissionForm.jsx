import { Field, Form, Formik } from 'formik';
import Card from '../Card';
import React from 'react';
import { GET_MISSION_BY_ID } from '../../graphql/missionsQuery';
import { Query } from 'react-apollo';

const MissionForm = ({ missionid }) => {
  return (
    <Query query={GET_MISSION_BY_ID} variables={{ id: missionid }}>
      {({ loading, error, data: { missions } }) => {
        if (loading) return <p>Loading…</p>;
        if (error) return <p>Sorry! There was an error loading the items</p>;
        return (
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
        );
      }}
    </Query>
  );
};

export default MissionForm;
