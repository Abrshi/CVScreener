const Application = require("../models/applicationModel");
const githubService = require("./../githubServices");
//  const {
//    fullname,
//    email,
//    age,
//    phoneNumber,
//    educationLevel,
//    gpa,
//    primarySkill,
//    toolsAndTechnologies,
//    github,
//    aiExperience,
//    projectLink,
//    projectDescription,
//    salaryExpectation,
//    cvPath,
//    whyHireYou,
//    position,
//  } = req.body;

//  if (!cvPath) return res.status(400).json({ message: "CV file is required" });

//  const newApplication = newApplication({
//    fullname,
//    email,
//    age,
//    phoneNumber,
//    educationLevel,
//    gpa,
//    primarySkill,
//    toolsAndTechnologies,
//    github,
//    aiExperience,
//    projectLink,
//    projectDescription,
//    salaryExpectation,
//    cvPath: cvPath.path,
//  });

//  await Application.save(newApplication);
exports.createApplication = async (req, res, next) => {
  try {
    const newApplication = await Application.create(req.body);
    console.log("New application created:", newApplication);
    res.status(201).json({
      status: "success",
      data: newApplication,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllAplications = async (req, res, next) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      status: "success",
      results: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
