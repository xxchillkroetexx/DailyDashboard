/**
 *  Hier wird die Profil-Seite des Users dargestellt
 */

import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

// Profile component
type Props = {};

// Profile component
type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: IUser & { accessToken: string };
};
// Profile component
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
    };
  }

  // reload the page
  componentDidMount() {
    const currentUserToken = AuthService.getCurrentUser();

    // redirect to home if already logged in
    if (!currentUserToken) this.setState({ redirect: "/home" });
    this.setState({
      currentUser: { accessToken: currentUserToken },
      userReady: true,
    });
  }

  // render the profile page
  render() {
    // redirect to home if not logged in
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    // return the profile page
    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
              ...{" "}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
