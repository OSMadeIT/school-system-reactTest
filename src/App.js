import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar <span className="badge badge-pill badge-secondary">{}</span>
        </a>
      </nav>
    );
  }
}

export default App;
