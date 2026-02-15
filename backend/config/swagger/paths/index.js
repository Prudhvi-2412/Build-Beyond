const authPathOverrides = require("./auth");
const customerPathOverrides = require("./customer");
const companyPathOverrides = require("./company");
const workerPathOverrides = require("./worker");
const adminPathOverrides = require("./admin");
const paymentPathOverrides = require("./payment");
const platformManagerPathOverrides = require("./platformManager");
const projectPathOverrides = require("./project");
const reviewPathOverrides = require("./review");
const complaintPathOverrides = require("./complaint");
const chatPathOverrides = require("./chat");

module.exports = {
  ...authPathOverrides,
  ...customerPathOverrides,
  ...companyPathOverrides,
  ...workerPathOverrides,
  ...adminPathOverrides,
  ...paymentPathOverrides,
  ...platformManagerPathOverrides,
  ...projectPathOverrides,
  ...reviewPathOverrides,
  ...complaintPathOverrides,
  ...chatPathOverrides,
};
