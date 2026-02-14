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
  githubLink: {
    type: String,
    required: [true, "Please enter you Git hub Account link"],
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
    type: String, //
    // required: true,
  },

  whyHireYou: {
    type: String,
    required: true,
    min: 100,
    max: 150,
  },
  position: {
    type: String,
    required: true,
  },
  githubUsername: { type: String, trim: true },
  githubInsights: {
    username: String,
    name: String,
    avatar: String,
    bio: String,
    location: String,
    joined: String,
    publicRepos: Number,
    followers: Number,
    recentActivity: Number,
    mostActiveRepo: String,
    topLanguages: [String],
    activityLevel: String,
  },
  score: {
    type: String,
    default: 0,
  },
  job: [{ type: mongoose.Schema.ObjectId, ref: "Application" }],
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
