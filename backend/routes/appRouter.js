const express = require("express");
const router = express.Router();
const applicationController = require("./../controller/applicationController");

router
  .route("/")
  .post(applicationController.createApplication)
  .get(applicationController.getAllAplications);

module.exports = router;
