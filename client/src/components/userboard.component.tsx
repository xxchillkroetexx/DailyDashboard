/**
 * Hauptcontent Seite, hier wird content dargestellt der Login erfordert
 *
 */

import { Component } from "react";
import GetWitz from "../services/GetWitz.service";
import UserService from "../services/user.service";
import "../style/Userboard.css";
import WeatherPanel from "./WeatherPanel";
import RSSPanel from "../services/RSS.service";

type Props = {};

type State = {
  content: any;
};

// UserBoard component
export default class UserBoard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // set the state
    this.state = {
      content: (
        <>
          <div className="UserBoard">
            <div className="tile-1">
              <h1>Wetter</h1> <WeatherPanel />
            </div>
            <div className="tile-2">
              <h2>Witz des Tages</h2> <GetWitz />
            </div>
            <div className="tile-3">
              <h3>RSS Feed</h3> <RSSPanel />
            </div>
            <div className="tile-4">
              <h4>Notizen</h4> {/* placeholder */}
              <h5>WIP</h5> {/* placeholder */}
            </div>
          </div>
        </>
      ),
    };
  }

  // get the content from the backend
  componentDidMount() {
    UserService.getPublicContent().then(
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
            (error.response && error.response.data) ||
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
