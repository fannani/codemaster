import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { login } from '../../actions/users';
import connect from 'react-redux/es/connect/connect';
import { Redirect } from "react-router-dom";

class Login extends Component {
  render() {
    if(this.props.loggingIn){
      return <Redirect push to={`/dashboard`} />;
    }
    return (
      <div className="container">
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
                  onSubmit={(values,{setSubmitting}) =>{
                    const { email, password } = values;
                    if (email && password) {
                      this.props.login(email, password).then(()=>{
                        setSubmitting(false);
                      });
                    }
                  }}
                  >
                  {({isSubmitting}) => (
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
                        <label className="custom-control-label" for="customCheck1">
                          Remember password
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit" disabled={isSubmitting}
                      >
                        Sign in
                      </button>
                      <hr className="my-4" />
                      <button
                        className="btn btn-lg btn-google btn-block text-uppercase"
                        type="submit"
                      >
                        <i className="fab fa-google mr-2" /> Sign in with Google
                      </button>
                      <button
                        className="btn btn-lg btn-facebook btn-block text-uppercase"
                        type="submit"
                      >
                        <i className="fab fa-facebook-f mr-2" /> Sign in with
                        Facebook
                      </button>
                    </Form>
                  )}

                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn } = state.users;
  return {
    loggingIn,
  };
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
