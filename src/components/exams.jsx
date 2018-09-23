import React, { Component } from "react";
import axios from "axios";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = { exams: [], examName: "" };
  }

  handleChange = event => {
    this.setState({ examName: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const exam = {
    //   examName: this.state.examName
    // };

    axios
      .post("http://localhost:8080/angular-school-test/api/exams/create", {
        name: this.state.examName
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            New Exam Name:
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.handleChange}
            />
          </label>
          <button className="btn btn-secondary" type="submit">
            Save
          </button>
        </form>
        <h3>Exams Types</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Exam Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exams.map(exam => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/angular-school-test/api/exams/list")
      .then(response => {
        this.setState({ exams: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default Exam;
