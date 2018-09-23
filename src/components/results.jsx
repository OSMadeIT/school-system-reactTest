import React, { Component } from "react";
import axios from "axios";
import XLSX from "xlsx";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  render() {
    return (
      <div className="container">
        <h3>Exam Resuts</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student Name</th>
              <th scope="col">Exam Name</th>
              <th scope="col">Total Mark</th>
            </tr>
          </thead>
          <tbody>
            {this.state.results.map(result => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>
                  {result.studentId.firstName + " " + result.studentId.lastName}
                </td>
                <td>{result.examId.name}</td>
                <td>{result.totalMark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/angular-school-test/api/results/list")
      .then(response => {
        this.setState({ results: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default Result;
