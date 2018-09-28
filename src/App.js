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
          <a className="navbar-brand" href="">
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
            <Router basename={"/angular-school-test"}>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/students" className="nav-link">
                    Students <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/exams" className="nav-link">
                    Exams <span className="sr-only" />
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/results" className="nav-link">
                    Results <span className="sr-only" />
                  </Link>
                </li>
                <Switch>
                  <Route exact path="/" component={Student} />
                  <Route path="/results" component={Result} />
                  <Route path="/students" component={Student} />
                  <Route path="/exams" component={Exam} />
                </Switch>
              </ul>
            </Router>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default App;
