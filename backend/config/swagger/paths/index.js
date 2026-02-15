const authPathOverrides = require("./auth");
const customerPathOverrides = require("./customer");
const companyPathOverrides = require("./company");
const workerPathOverrides = require("./worker");
const adminPathOverrides = require("./admin");
const paymentPathOverrides = require("./payment");
const platformManagerPathOverrides = require("./platformManager");

module.exports = {
  ...authPathOverrides,
  ...customerPathOverrides,
  ...companyPathOverrides,
  ...workerPathOverrides,
  ...adminPathOverrides,
  ...paymentPathOverrides,
  ...platformManagerPathOverrides,
};
