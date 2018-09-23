import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Student from "./components/students";
import Exam from "./components/exams";
import Result from "./components/results";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="">
            Students <span className="badge badge-pill badge-secondary" />
          </a>
        </nav>
        <Student />
        {/* <Exam /> */}
        <Result />
      </React.Fragment>
    );
  }
}

export default App;
