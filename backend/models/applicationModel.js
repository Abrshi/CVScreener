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
  age: {
    type: Number,
    min: 16,
    max: 100,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  educationLevel: {
    type: String,
    enum: ["High School", "Diploma", "Bachelor", "Master", "PhD", "Other"],
    required: true,
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4,
  },
  primarySkill: {
    type: String,
    required: true,
  },
  toolsAndTechnologies: String,
  github: String,
  aiExperience: String,
  project: String,
  salaryExpectation: {
    type: Number,
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
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
