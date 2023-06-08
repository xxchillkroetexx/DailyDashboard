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
            {/* Die 4 Tiles auf der Seite. Design wird aus UserBoard.css gezogen */}
            <div className="tile">
              <h1>Witz des Tages</h1> <GetWitz />
            </div>
            <div className="tile">
              <h2>Wetter</h2> <WeatherPanel />
            </div>
            <div className="tile"> 
              <h2>RSS Feed</h2> <RSSPanel />
            </div>
            <div className="tile"> Hier Tile Content einfügen </div>
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
