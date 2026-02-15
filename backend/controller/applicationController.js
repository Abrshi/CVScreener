const Application = require("../models/applicationModel");
const { processAI } = require("./ai");

exports.createApplication = async (req, res, next) => {
  try {
   
    const job = await Application.findById(req.body.jobId);

   
    const result = await processAI(req.body, job);

 
    req.body.rank = result;

   
    const newApplication = await Application.create(req.body);

    res.status(201).json({
      status: "success",
      data: { data: newApplication },
    });

  } catch (error) {
    console.log("Error creating application:", error);
    res.status(404).json({
      status: "failed",
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
