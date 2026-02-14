const express = require("express");
const router = express.Router();
const jobPostController = require("./../controller/jobPostController");

router
  .route("/")
  .post(jobPostController.createJobPost)
  .get(jobPostController.getAllJobPosts);

module.exports = router;
