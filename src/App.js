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
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="">
            Students <span className="badge badge-pill badge-secondary" />
          </a>
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
        </nav>
        <Router>
          <Switch>
            <Route exact path="/exams" component={Exam} />
            <Route path="/results" component={Result} />
            <Route path="/students" component={Student} />
          </Switch>
        </Router>

        <Student />
        <Exam />
        <Result />
      </React.Fragment>
    );
  }
}

export default App;
