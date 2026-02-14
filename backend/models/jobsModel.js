const mongoose = require("mongoose");
// const validator = require("validator");

const jobSchema = mongoose.Schema({
  jobTitle: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
