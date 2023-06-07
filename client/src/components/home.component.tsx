/**
 * Hauptcontent Seite, hier wird content dargestellt der keinen Login erfordert
 *
 */

import { Component } from "react";
import GetWitz from "./GetWitz";
import UserService from "../services/user.service";
import "../Home.css";
import WeatherPanel from "./WeatherPanel";

type Props = {};

type State = {
  content: any;
};

// Home component
export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // set the state
    this.state = {
      content: (
        <>
          {/* Header mit Darkmode, Name und Login */}
          {/* Body der Hauptseite. Design wird aus Home.css gezogen */}
          <div className="Home">
            {/* Die 4 Tiles auf der Seite. Design wird aus Home.css gezogen */}
            <div className="tile"> <h1>Witz des Tages</h1>  <GetWitz/></div>
            <div className="tile"> <WeatherPanel/> </div>
            <div className="tile"> Hier Tile Content einfügen </div>
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
