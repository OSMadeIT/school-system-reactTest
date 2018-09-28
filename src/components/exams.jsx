import React, { Component } from "react";
import axios from "axios";
import XLSX from "xlsx";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      examName: "",
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
    };
    this.handleFile = this.handleFile.bind(this);
    this.saveBtn = React.createRef();
  }

  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const name = ["name"];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const postData = XLSX.utils.sheet_to_json(ws, { header: name });
      // console.log(postData);
      const saveBtn = this.saveBtn.current;
      saveBtn.addEventListener("click", () => {
        console.log("Clicked");
        // send data to db
        for (let i = 0; i < postData.length; i++) {
          if (i !== 0) {
            const examBody = {
              name: postData[i].name
            };

            console.log(examBody);
            axios
              .post(
                "http://localhost:8080/angular-school-test/api/exams/create",
                examBody
              )
              .then(res => {
                console.log(res);
                console.log(res.data);
              });
          }
        }
      });
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
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
        <DragDropFile handleFile={this.handleFile}>
          <div className="row">
            <div className="col-xs-12">
              <DataInput handleFile={this.handleFile} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12" />
          </div>
          <div className="row">
            <div className="col-xs-12">
              <OutTable data={this.state.data} cols={this.state.cols} />
            </div>
          </div>
        </DragDropFile>

        <button className="btn btn-secondary" type="submit" ref={this.saveBtn}>
          Save Excel
        </button>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Exam Name:
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.handleChange}
              required
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

// if (typeof module !== "undefined") module.exports = Student;

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <form className="form-inline">
        <div className="row">
          <div className="col">
            <h5>
              <a
                href="http://localhost:8080/angular-school-test/api/exams/download"
                download
              >
                Download
              </a>{" "}
              Empty Exam Spreadsheet
            </h5>
            <div className="col">
              <div className="form-group">
                <label htmlFor="file">Upload Exam</label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  accept={SheetJSFT}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {this.props.cols.map(c => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((r, i) => (
              <tr key={i}>
                {this.props.cols.map(c => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export default Exam;
