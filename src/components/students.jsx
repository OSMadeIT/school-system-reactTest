import React, { Component } from "react";
import axios from "axios";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      firstName: "",
      lastName: "",
      regNo: ""
    };
  }

  handleRegChange = event => {
    this.setState({
      regNo: event.target.value
    });
  };
  handleFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    });
  };
  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/angular-school-test/api/students/create", {
        regNo: this.state.regNo,
        firstName: this.state.firstName,
        lastName: this.state.lastName
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
          <label>First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            onChange={this.handleFirstNameChange}
          />
          <label>Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            onChange={this.handleLastNameChange}
          />
          <label>Reg No</label>
          <input
            className="form-control"
            type="number"
            name="regNo"
            onChange={this.handleRegChange}
          />
          <button className="btn btn-secondary  m-2" type="submit">
            Save
          </button>
        </form>
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
