/**
 * Hier wird content dargestellt nachdem ein User sich angemeldet hat
 *
 */

import { Component } from "react";

import UserService from "../services/user.service";

type Props = {};

type State = {
  content: string;
};

// BoardUser component
export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "", // TODO
    };
  }

  // get the content from the backend
  componentDidMount() {
    UserService.getUserBoard().then(
      // if there is a response, set the content to the response data
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      // if there is an error, set the content to the error message
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  // render the content
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
