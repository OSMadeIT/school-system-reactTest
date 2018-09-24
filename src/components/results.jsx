import React, { Component } from "react";
import ReactDOM from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts";
import axios from "axios";

const options = {
  title: {
    text: "My stock chart"
  },

  series: [
    {
      data: [
        [Date.UTC(2013, 5, 2), 0.7695],
        [Date.UTC(2013, 5, 3), 0.7648],
        ...[Date.UTC(2013, 5, 24), 0.7623]
      ]
    }
  ]
};

const App = () => (
  <div>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  </div>
);

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
        {App}
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
