const Application = require("../models/applicationModel");


exports.createApplication = async (req, res, next) => {
  // const newTour = new Tour({}); we can also use this approach
  // newTour.save().then()
  try {
    const job = await Application.findById(newApplication.jobId);
    const result = await processAI(newApplication, job);
    req.body.score = result;
    const newApplication = await Application.create(req.body);

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
