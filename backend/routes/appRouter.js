const express = require("express");
const multer = require("multer");

const router = express.Router();
const applicationController = require("./../controller/applicationController");
const Application = require("../models/applicationModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Keep original name + timestamp to avoid duplicates
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: function (req, file, cb) {
    // Accept only PDFs and Word docs
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and Word files are allowed!"), false);
    }
  },
});

// POST route with file upload
router.post(
  "/applications",
  upload.single("cv"),
  applicationController.createApplication,
);

router
  .route("/")
  .post(applicationController.createApplication)
  .get(applicationController.getAllAplications);

module.exports = router;
