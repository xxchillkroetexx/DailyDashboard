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
            <h1>Bitte anmelden!</h1>
          </div>
          <div className="tile">
            <h2>Witz des Tages</h2> <GetWitz />
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
