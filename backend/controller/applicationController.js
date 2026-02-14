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
    const {
      fullname,
      email,
      age,
      phoneNumber,
      educationLevel,
      gpa,
      primarySkill,
      toolsAndTechnologies,
      githubLink,
      githubUsername,
      aiExperience,
      projectLink,
      projectDescription,
      salaryExpectation,
      cvPath,
      whyHireYou,
      position,
    } = req.body;
    let githubInsights = null;

    if (githubUsername) {
      githubInsights = await githubService.getInsights(githubUsername);
    }

    const newApplication = new Application({
      fullname,
      email,
      age,
      phoneNumber,
      educationLevel,
      gpa,
      primarySkill,
      toolsAndTechnologies,
      githubLink,
      aiExperience,
      githubUsername: githubUsername || null,
      githubInsights,
      projectLink,
      projectDescription,
      salaryExpectation,
      cvPath,
      whyHireYou,
      position,
    });

    await newApplication.save();
    res.status(201).json({
      staus: "success",
      data: { data: newApplication },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      staus: "failed",
      data: { error },
    });
  }
};
exports.getAllAplications = async (req, res, next) => {
  // const newTour = new Tour({}); we can also use this approach
  // newTour.save().then()
  const applications = await Application.find();
  res.status(201).json({
    staus: "success",
    data: { length: applications.length, data: applications },
  });
};
