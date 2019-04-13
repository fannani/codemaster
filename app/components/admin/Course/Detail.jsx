import React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_COURSE } from '../../../queries/courses';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { UPDATE_SUCCESS } from '../../../constants/notification';
import AceEditor from 'react-ace';
import Card from '../../UI/Card';

const AdminCourseDetail = ({ courses }) => {
  return (
    <Card className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">Detail Course</h5>
        </div>
        <Mutation mutation={UPDATE_COURSE}>
          {updateCourse => (
            <Formik
              initialValues={{
                name: courses.name,
                desc: courses.desc,
                script: courses.script,
              }}
              onSubmit={({ name, desc, script }, { setSubmitting }) => {
                setSubmitting(true);
                updateCourse({
                  variables: {
                    id: courses._id,
                    name,
                    desc,
                    script,
                  },
                }).then(() => {
                  setSubmitting(false);
                  toast.success(UPDATE_SUCCESS);
                });
              }}
            >
              {(values, setFieldValue, onChange) => (
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
                    <label htmlFor="name">Initial Script</label>
                    <AceEditor
                      mode="html"
                      theme="tomorrow"
                      value={values.script}
                      width="100%"
                      style={{ height: '200px' }}
                      setOptions={{
                        fontSize: '12pt',
                        vScrollBarAlwaysVisible: true,
                      }}
                      onChange={onChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      </div>
    </Card>
  );
};

export default AdminCourseDetail;
