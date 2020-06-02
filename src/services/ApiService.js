import axios from "axios";

const JOB_API_BASE_URL = "http://localhost:8080/job";

class ApiService {
  fetchJob() {
    return axios.get(JOB_API_BASE_URL);
  }

  fetchJobById(jobId) {
    return axios.get(JOB_API_BASE_URL + "/" + jobId);
  }

  deleteJob(jobId) {
    return axios.delete(JOB_API_BASE_URL + "/" + jobId);
  }

  addJob(job) {
    return axios.post("" + JOB_API_BASE_URL, job);
  }

  editJob(job) {
    return axios.post(JOB_API_BASE_URL + "/" + job.jobId, job);
  }
}

export default new ApiService();
