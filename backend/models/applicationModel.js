const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please Enter Your name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    unique: [true, "Duplicate Email Not allowed"],
    lowercase: true,
  },
  age: String,
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  educationLevel: {
    type: String,
    required: true,
  },
  gpa: String,
  primarySkill: {
    type: String,
    required: true,
  },
  toolsAndTechnologies: String,
  github: String,
  aiExperience: String,
  project: String,
  projectDescription: String,
  salaryExpectation: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
  whyHireYou: String,
  position: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
  },
  position: {
  jobId: {
    type: String,
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
