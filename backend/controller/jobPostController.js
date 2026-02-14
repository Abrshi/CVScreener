const JobPost = require("../models/jobPostModel");

exports.createJobPost = async (req, res, next) => {
  try {
    const newJobPost = await JobPost.create(req.body);
    res.status(201).json({
      status: "success",
      data: newJobPost,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await JobPost.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: jobPosts.length,
      data: jobPosts,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
