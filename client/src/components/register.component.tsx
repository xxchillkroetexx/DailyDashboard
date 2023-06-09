/**
 *  Hier wird die Registrierungs-Seite dargestellt
 */

import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import React from "react";
import AuthService from "../services/auth.service";
import logo from "../style/DD-Logo.png";

type Props = {};

type State = {
  username: string;
  email: string;
  password: string;
  successful: boolean;
  message: string;
};

// Register component
export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    // Set the initial state
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }
  /**
   *  Defines the validation rules for the form fields using Yup.
   *  Ensures that the username is between 3 and 20 characters,
   *  email is a valid email address, and the password is between
   *  6 and 40 characters.
   */
  validationSchema() {
    // Define the validation rules using Yup
    return Yup.object().shape({
      // Validate the username field
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val && val.toString().length >= 3 && val.toString().length <= 20
        )
        .required("This field is required!"),
      // Validate the email field
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      // Validate the password field
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val && val.toString().length >= 6 && val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }
  /**
   * Handles the registration form submission.
   * Calls the AuthService to register the user.
   * Updates the component's state with the response data.
   */
  handleRegister(formValue: {
    username: string;
    email: string;
    password: string;
  }) {
    // Extract the username, email and password from the form data
    const { username, email, password } = formValue;
    // Reset the message and successful status
    this.setState({
      message: "",
      successful: false,
    });

    // Call the AuthService to register the user
    AuthService.register(username, email, password).then(
      (response) => {
        // Registration successful, update the message and successful status
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        // Registration failed, update the message and successful status
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;
    // Initialize form field values

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src={logo} // Hier den Pfad zum generellen Logo angeben
            alt="logo"
            className="logo-img-card" // Statt "profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  {/* Username field */}
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  {/* Email field */}
                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  {/* Password field */}
                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
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

                  {/* Submit button */}
                  <div className="form-group d-grid">
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-block"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* Display success or error message */}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
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
