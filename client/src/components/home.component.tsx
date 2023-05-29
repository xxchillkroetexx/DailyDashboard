/**
 * Hauptcontent Seite, hier wird content dargestellt der keinen Login erfordert
 *
 */

import { Component } from "react";
import GetWitz from "./GetWitz";
import UserService from "../services/user.service";
import "../Home.css";

type Props = {};

type State = {
  content: any;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: (
        <>
          {/* Header mit Darkmode, Name und Login */}
          {/* Body der Hauptseite. Design wird aus Home.css gezogen */}
          <div className="Home">
            {/* Die 4 Tiles auf der Seite. Design wird aus Home.css gezogen */}
            <div className="tile"> <h1>Witz des Tages</h1>  <GetWitz/></div>
            <div className="tile"> Hier Tile Content einfügen </div>
            <div className="tile"> Hier Tile Content einfügen </div>
            <div className="tile"> Hier Tile Content einfügen </div>
          </div>
        </>
      ),
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
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
