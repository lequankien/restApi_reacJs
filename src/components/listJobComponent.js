import { Component } from "react";
import ApiService from "../services/ApiService";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
class listJobComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      message: null,
    };
    this.deleteJob = this.deleteJob.bind(this);
    this.editJob = this.editJob.bind(this);
    this.addJob = this.addJob.bind(this);
    this.reloadJobList = this.reloadJobList.bind(this);
  }
  componentDidMount() {
    this.reloadJobList();
  }
  reloadJobList() {
    ApiService.fetchJob()
      .then((res) => {
        console.log(res);
        this.setState({ jobs: res.data });
        // console.log.apply(jobs);
      })
      .catch(console.log);
  }

  deleteJob(jobId) {
    ApiService.deleteJob(jobId).then((res) => {
      this.setState({ message: "Job deleted successfully." });
      this.setState({
        jobs: this.state.jobs.filter((job) => job.jobId !== jobId),
      });
    });
  }

  editJob(jobId) {
    window.localStorage.setItem("jobId", jobId);
    this.props.history.push("/edit-job");
  }
  addJob() {
    window.localStorage.removeItem("jobId");
    this.props.history.push("/add-job");
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Job Details</h2>
        <button
          className="btn btn-danger"
          style={{ width: "100px" }}
          onClick={() => this.addJob()}
        >
          {" "}
          Add Job
        </button>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Job Id</th>
              <th>JobName</th>
              <th>CreateUser</th>
              <th>CreateDate</th>
              <th>UpdateUser</th>
              <th>UpdateDate</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.jobs
              ? this.state.jobs.map((job) => (
                  <tr key={job.jobId}>
                    <td>{job.jobId}</td>
                    <td>{job.jobName}</td>
                    <td>{job.createUser}</td>
                    <td>{job.createDate}</td>
                    <td>{job.updateUser}</td>
                    <td>{job.updateDate}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => this.deleteJob(job.jobId)}
                      >
                        {" "}
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => this.editJob(job.jobId)}
                      >
                        {" "}
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}
export default listJobComponent;
