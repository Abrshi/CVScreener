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

exports.getTopApplicationStats = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.getRankedApplications = async (req, res, next) => {
  try {
    const applications = await Application.find();

    const rankedApplications = applications
      .filter((app) => {
        // Filter out salary >= 30000
        const salary = parseFloat(app.salaryExpectation);
        if (!isNaN(salary) && salary >= 30000) return false;

        // Filter out GPA < 2.5
        const gpa = parseFloat(app.gpa);
        if (!isNaN(gpa) && gpa < 2.5) return false;

        return true;
      })
      .map((app) => {
        let score = 0;

        // Education level scoring
        const educationScores = {
          "High School": 1,
          Diploma: 2,
          "Bachelor's": 3,
          Bachelor: 3,
          "Master's": 4,
          Master: 4,
          PhD: 5,
          Other: 2,
        };
        score += (educationScores[app.educationLevel] || 0) * 5;

        // GPA scoring
        if (app.gpa) {
          const gpaValue = parseFloat(app.gpa);
          if (!isNaN(gpaValue)) score += gpaValue * 10;
        }

        // GitHub scoring
        if (app.github && app.github.includes("github.com")) {
          score += 10;
        }

        // Salary expectation scoring
        if (app.salaryExpectation) {
          const salary = parseFloat(app.salaryExpectation);
          if (!isNaN(salary)) {
            const salaryScore = 50 - salary / 1000;
            if (salaryScore > 0) score += salaryScore;
          }
        }

        return {
          fullname: app.fullname,
          email: app.email,
          position: app.position,
          score: Math.round(score * 100) / 100,
          _id: app._id,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    res.status(200).json({
      status: "success",
      results: rankedApplications.length,
      data: rankedApplications,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        status: "failed",
        message: "Application not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
