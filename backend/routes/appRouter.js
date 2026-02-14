const express = require("express");
const router = express.Router();
const applicationController = require("./../controller/applicationController");

router.route("/ranked").get(applicationController.getRankedApplications);

router.route("/:id").get(applicationController.getApplicationById);

router
  .route("/")
  .post(applicationController.createApplication)
  .get(applicationController.getAllAplications);

module.exports = router;
