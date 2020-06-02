import React, { Component } from "react";
import ApiService from "../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

class addUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: "",
      jobName: "",
      description: "",
      imgURL: "",
      fileURL: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  //parser file to base64

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

  //get data form Editor
  handleChange(event) {
    this.setState({ description: event });
  }

  onClickHandler = (e) => {
    e.preventDefault();
    let job = {
      jobId: this.state.jobId,
      jobName: this.state.jobName,
      description: this.state.description,
      imgURL: this.state.imgURL,
      fileURL: this.state.fileURL,
    };
    ApiService.addJob(job).then((res) => {
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
              {this.state.href ? <img src={this.state.href} alt="" /> : null}
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
            onClick={this.onClickHandler}
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default addUserComponent;
