const express = require("express");
const router = express.Router();
const {
  submitBidForm,
  getDashboard,
  postConstructionForm,
  getJobRequestStatus,
  getConstructionCompaniesList,
  getArchitects,
  getArchitectForm,
  getOngoingProjects,
  getDesignIdeas,
  getInteriorDesignForm,
  getInteriorDesigners,
  getConstructionForm,
  getBidForm,
  getSettings,
  getBidSpace,
  acceptProposal,
  acceptCompanyBid,
  acceptCompanyProposal,
  acceptConstructionProposal,
  rejectCompanyProposal,
  rejectProposal,
  updateCustomerSettings,
  updatePassword,
  approveMilestone,
  rejectMilestone,
  requestMilestoneRevision,
  reportMilestoneToAdmin,
  getEditableRequestDetails,
  updateEditableRequest,
  getArchitectHiringDetails,
  getDesignRequestDetails,
  getPaymentHistory,
} = require("../controllers/customerController");

const {
  submitCustomerReview,
  getProjectReviewStatus,
} = require("../controllers/reviewController");
const { upload } = require("../middlewares/upload");
const auth = require("../middlewares/auth");

// Route to get logged-in customer profile
router.get("/customer/profile", auth, async (req, res) => {
  try {
    const { Customer } = require("../models");
    const user = await Customer.findById(req.user.user_id).lean();
    if (!user) return res.status(404).json({ error: "Customer not found" });
    const { name, email, phone } = user;
    res.json({ name, email, phone });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Public routes (no authentication required)
router.get("/home", getDashboard);
router.get("/customerdashboard", getDashboard);
router.get("/architect", getArchitects);
router.get("/architect_form", getArchitectForm);
router.get("/design_ideas", getDesignIdeas);
router.get("/constructionform", getConstructionForm);
router.post("/constructionform", auth, postConstructionForm);
router.post(
  "/bidForm_Submit",
  auth,
  upload.fields([
    { name: "siteFiles", maxCount: 10 },
    { name: "floorImages", maxCount: 100 },
  ]),
  submitBidForm,
);
router.get("/bidform", getBidForm);

// Protected routes (require authentication)
router.get("/job_status", auth, getJobRequestStatus);
router.get("/construction_companies_list", auth, getConstructionCompaniesList);
router.get("/ongoing_projects", auth, getOngoingProjects);
router.get("/interiordesign_form", auth, getInteriorDesignForm);
router.get("/interior_designer", auth, getInteriorDesigners);
router.get("/customersettings", auth, getSettings);
router.post("/customersettings/update", auth, updateCustomerSettings);
router.get("/bidspace", auth, getBidSpace);
router.get("/customer/accept-proposal/:type/:id", auth, acceptProposal);
router.get("/customer/accept-bid/:bidId/:companyBidId", auth, acceptCompanyBid);
router.get(
  "/customer/accept-company-proposal/:projectId",
  auth,
  acceptCompanyProposal,
);
router.post("/customer/accept-proposal", auth, acceptConstructionProposal);
router.post(
  "/customer/reject-company-proposal/:projectId",
  auth,
  rejectCompanyProposal,
);
router.post("/customer/reject-proposal/:type/:projectId", auth, rejectProposal);
router.post("/customer/password/update", auth, updatePassword);
router.post(
  "/customer/milestone/approve/:projectId/:milestoneId",
  auth,
  approveMilestone,
);
router.post(
  "/customer/milestone/reject/:projectId/:milestoneId",
  auth,
  rejectMilestone,
);
router.post(
  "/customer/milestone/request-revision/:projectId/:milestoneId",
  auth,
  requestMilestoneRevision,
);
router.post(
  "/customer/milestone/report-to-admin/:projectId/:milestoneId",
  auth,
  reportMilestoneToAdmin,
);

router.get(
  "/customer/editable-request/:type/:projectId",
  auth,
  getEditableRequestDetails,
);
router.put(
  "/customer/editable-request/:type/:projectId",
  auth,
  upload.any(),
  updateEditableRequest,
);

// Review routes
router.post("/customer/review", auth, submitCustomerReview);
router.get(
  "/customer/review-status/:projectType/:projectId",
  auth,
  getProjectReviewStatus,
);

// Payment checkout - get project details
router.get("/architect-hiring/:projectId", auth, getArchitectHiringDetails);
router.get("/design-request/:projectId", auth, getDesignRequestDetails);

// Payment history
router.get("/customer/payment-history", auth, getPaymentHistory);

module.exports = router;
