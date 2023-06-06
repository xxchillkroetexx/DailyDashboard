/**
 *  Hier wird die Login-Seite dargestellt
 *
 */

import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import AuthService from "../services/auth.service";

type Props = {};

type State = {
  redirect: string | null;
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

// Login component
export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    // set the state of the component
    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  componentDidMount() {
    // get the current user
    const currentUser = AuthService.getCurrentUser();

    // redirect to home if already logged in
    if (currentUser) {
      this.setState({ redirect: "/home" });
    }
  }

  // reload the page
  componentWillUnmount() {
    window.location.reload();
  }

  // validation schema for the login form
  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  // login function
  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    // set the state of the component
    this.setState({
      message: "",
      loading: true,
    });

    // login function from the auth.service.ts
    AuthService.login(username, password).then(
      () => {
        // redirect to home if login is successful
        this.setState({
          redirect: "/home",
        });
      },
      // if login is not successful, set the error message
      (error) => {
        // get the error message
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // set the state of the component
        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  // render the login form
  render() {
    // redirect to home if already logged in
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    // get the state of the component
    const { loading, message } = this.state;

    // initial values for the login form
    const initialValues = {
      username: "",
      password: "",
    };

    // return the login form
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          {/* error message */}
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group d-grid">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
