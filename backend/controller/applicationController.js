const Application = require("../models/applicationModel");

exports.createApplication = async (req, res, next) => {
  // const newTour = new Tour({}); we can also use this approach
  // newTour.save().then()
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
      github,
      aiExperience,
      projectLink,
      projectDescription,
      salaryExpectation,
      cvPath,
      whyHireYou,
      position,
    } = req.body;

    if (!cvPath)
      return res.status(400).json({ message: "CV file is required" });

    const newApplication = newApplication({
      fullname,
      email,
      age,
      phoneNumber,
      educationLevel,
      gpa,
      primarySkill,
      toolsAndTechnologies,
      github,
      aiExperience,
      projectLink,
      projectDescription,
      salaryExpectation,
      cvPath: cvPath.path,
    });

    await Application.save(newApplication);

    res.status(201).json({
      staus: "success",
      data: { data: newApplication },
    });
  } catch (error) {
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
