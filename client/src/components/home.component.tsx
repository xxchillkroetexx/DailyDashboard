/**
 * Homepage Seite, hier wird content dargestellt der keinen Login erfordert
 *
 */

import { Component } from "react";
import GetWitz from "../services/GetWitz.service";
import logo from "../style/DD-Logo.png";
import "../style/home.css";

type Props = {};

type State = {
  content: any;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // set the state
    this.state = {
      content: (
        <div className="Home">
          <img src={logo} alt="logo" className="logo-img-card" />
          <div className="message">
            <h2>Bitte anmelden</h2>
          </div>
          <div className="tile">
            <h1>Witz des Tages</h1> <GetWitz />
            {/* Hier den Witz des Tages einfügen */}
          </div>
        </div>
      ),
    };
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
