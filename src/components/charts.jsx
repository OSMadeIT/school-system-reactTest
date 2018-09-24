import React, { Component } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

class Chart extends Component {
  state = {
    options: {
      title: {
        text: "Results Chart"
      },
      xAxis: {
        categories: ["Agr", "Eng", "Math", "Bio", "Chem", "Phyc", "Comp", "Geo"]
      },
      series: [
        {
          data: []
        }
      ]
    }
  };
  render() {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={this.state.options} />
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/angular-school-test/api/results/list")
      .then(response => {
        // console.log(response.data[0].agriculture);
        const marks = response.data[0];
        this.setState({
          options: {
            series: [
              {
                data: [
                  marks.agriculture,
                  marks.english,
                  marks.math,
                  marks.biology,
                  marks.chemistry,
                  marks.physics,
                  marks.computerStudies,
                  marks.geography
                ]
              }
            ]
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export default Chart;
