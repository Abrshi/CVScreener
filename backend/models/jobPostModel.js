const mongoose = require("mongoose");

const jobPostSchema = mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
