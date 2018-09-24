import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Student from "./components/students";
import Exam from "./components/exams";
import Result from "./components/results";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            React
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/students">
                  Students <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/exams">
                  Exams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/results">
                  Results
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Router>
          <Switch>
            <Route exact path="/exams" component={Exam} />
            <Route path="/results" component={Result} />
            <Route path="/students" component={Student} />
            <Route path="" component={Student} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
