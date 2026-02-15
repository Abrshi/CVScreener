const mongoose = require("mongoose");
// const validator = require("validator");

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
    // validate: [validator.isEmail, "Please enter a valid email"],
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
    enum: ["Bachelor", "Master", "PhD"],
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
  github: {
    type: String,
  },

  projectLink: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  salaryExpectation: {
    type: Number,
    required: true,
  },

  cv: {
    type: String, // store file path or cloud URL
    required: true,
  },

  whyHireYou: {
    type: String,
    required: true,
    min: 100,
    max: 150,
  },
  rank: {
    type: String,
  },
  position: {
    type: String,
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
