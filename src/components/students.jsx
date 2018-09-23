import React, { Component } from "react";
import axios from "axios";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  render() {
    return (
      <div className="container">
        <h3>List of Students</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student Name</th>
              <th scope="col">Admission Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName + " " + student.lastName}</td>
                <td>{student.regNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/angular-school-test/api/students/list")
      .then(response => {
        this.setState({ students: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default Student;
