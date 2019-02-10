import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { login } from '../../actions/users';
import connect from 'react-redux/es/connect/connect';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 100% !important;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background: #9cecfb;
  background: -webkit-linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
  background: linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
`;

class Login extends Component {
  render() {
    if (this.props.isLogin) {
      return <Redirect push to={`/`} />;
    }
    return (
      <Container className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const { email, password } = values;
                    if (email && password) {
                      this.props.login(email, password).then(() => {
                        setSubmitting(false);
                      });
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="form-signin">
                      <div className="form-label-group">
                        <Field
                          type="email"
                          name="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email address"
                          required
                          autoFocus
                        />
                        <label for="inputEmail">Email address</label>
                      </div>

                      <div className="form-label-group">
                        <Field
                          type="password"
                          name="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                        <label for="inputPassword">Password</label>
                      </div>

                      <div className="custom-control custom-checkbox mb-3">
                        <Field
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          for="customCheck1"
                        >
                          Remember password
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign in
                      </button>
                      <hr className="my-4" />
                      <Link
                        to="register"
                        className="btn btn-lg  btn-block text-uppercase"
                      >
                        Sign Up
                      </Link>

                      {/*<button*/}
                      {/*className="btn btn-lg btn-google btn-block text-uppercase"*/}
                      {/*type="submit"*/}
                      {/*>*/}
                      {/*<i className="fab fa-google mr-2" /> Sign in with Google*/}
                      {/*</button>*/}
                      {/*<button*/}
                      {/*className="btn btn-lg btn-facebook btn-block text-uppercase"*/}
                      {/*type="submit"*/}
                      {/*>*/}
                      {/*<i className="fab fa-facebook-f mr-2" /> Sign in with*/}
                      {/*Facebook*/}
                      {/*</button>*/}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.users.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
