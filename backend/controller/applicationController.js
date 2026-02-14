const Application = require("../models/applicationModel");

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
