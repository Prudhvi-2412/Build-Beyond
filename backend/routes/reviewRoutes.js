const express = require("express");
const router = express.Router();
const {
  submitCustomerReview,
  submitWorkerReview,
  getProjectReviewStatus,
} = require("../controllers/reviewController");
const auth = require("../middlewares/auth");
const isAuthenticated = require("../middlewares/auth");

router.post("/customer/review", auth, submitCustomerReview);

router.post("/worker/review", isAuthenticated, submitWorkerReview);

router.get(
  "/project-review-status/:projectType/:projectId",
  getProjectReviewStatus,
);

module.exports = router;
