import React, { useState } from 'react';

import Card from '../../components/UI/Card';

import { Field, Form, Formik } from 'formik';
import Modal from 'react-bootstrap4-modal';

const Avatar = () => {
  const [show, setShow] = useState(false);
  const handleCreate = () => {
    setShow(true);
  };
  const handleModalClosed = () => {
    setShow(false);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <Card className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">Avatar</h5>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="btn btn-primary"
                >
                  Add Avatar
                </button>
              </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-12" />
              </div>
            </div>
          </Card>
        </main>
      </div>
      <Modal visible={show} onClickBackdrop={handleModalClosed}>
        <div className="modal-header">
          <h5 className="modal-title">Add Ava</h5>
        </div>
        <Formik
          initialValues={{
            title: '',
            min_exp: null,
            image: null,
          }}
        >
          {({ setFieldValue }) => (
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
                  <div className="form-group">
                    <label htmlFor="name">Minimal Exp</label>
                    <Field
                      className="form-control"
                      type="number"
                      placeholder="Minimal Exp"
                      name="min_exp"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={event => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                      className="form-control-file"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>

                <button
                  type="button"
                  onClick={handleModalClosed}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
export default Avatar;
