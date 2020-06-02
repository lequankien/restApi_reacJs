import React, { Component } from "react";
import ApiService from "../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

class editJobComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: "",
      jobName: "",
      description: "",
      imgURL: "",
      fileURL: "",
      createUser: "",
      createDate: "",
      updateUser: "",
      updateDate: "",
      href: null,
    };
    this.saveJob = this.saveJob.bind(this);
    this.loadJob = this.loadJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadJob();
  }

  loadJob() {
    ApiService.fetchJobById(window.localStorage.getItem("jobId")).then(
      (res) => {
        let job = res.data;
        this.setState({
          jobId: job.jobId,
          jobName: job.jobName,
          description: job.description,
          imgURL: job.imgURL,
          fileURL: job.fileURL,
          createUser: job.createUser,
          createDate: job.createDate,
          updateUser: job.updateUser,
          updateDate: job.updateDate,
        });
      }
    );
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onChangeHandler = (event) => {
    this.setState({
      // selectedFile: event.target.files[0],
      href: URL.createObjectURL(event.target.files[0]),
      loaded: 0,
    });
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      // Make a fileInfo Object
      const fileInfo = {
        base64: reader.result,
      };
      this.setState({
        imgURL: fileInfo.base64,
      });
    };

    // console.log(a);
    // console.log(this.state.href);
    // console.log(URL.createObjectURL(event.target.files[0]));
  };
  handleChange(event) {
    this.setState({ description: event });
  }
  saveJob = (e) => {
    e.preventDefault();
    let job = {
      jobId: this.state.jobId,
      jobName: this.state.jobName,
      description: this.state.description,
      imgURL: this.state.imgURL,
      fileURL: this.state.fileURL,
      createUser: this.state.createUser,
      createDate: this.state.createDate,
    };
    ApiService.editJob(job).then((res) => {
      this.setState({ message: "Job added successfully." });
      this.props.history.push("/jobs");
    });
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Edit Job</h2>
        <form>
          <SunEditor
            name="description"
            onChange={this.handleChange}
            setContents={this.state.description}
            placeholder="Please type here..."
            setOptions={{
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                ["paragraphStyle", "blockquote"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor", "textStyle"],
                ["removeFormat"],
                "/", // Line break
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["save", "template"],
              ],
            }}
          />
          <p>Custom file:</p>
          <div className="form-group">
            <div className="custom-file mb-3">
              <input
                type="file"
                className="custom-file-input"
                name="imgURL"
                onChange={this.onChangeHandler}
                accept="image/*"
              />
              <label className="custom-file-label" for="customFile">
                Choose file
              </label>
            </div>
            <div>
              {this.state.href ? (
                <img src={this.state.href} alt="" />
              ) : (
                <img src={this.state.imgURL} alt="" />
              )}
            </div>
            <p>Job Name:</p>
            <input
              type="text"
              placeholder="Job Name"
              name="jobName"
              value={this.state.jobName}
              className="form-control"
              onChange={this.onChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.saveJob}
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default editJobComponent;
