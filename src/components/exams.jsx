import React, { Component } from "react";
import axios from "axios";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = { exams: [] };
  }

  render() {
    return (
      <div className="container">
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
