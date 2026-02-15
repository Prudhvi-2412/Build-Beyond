module.exports = {
  "/api/payment/worker/create-order": {
    post: {
      tags: ["payment"],
      summary: "Create Razorpay order for worker deposit or milestone",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "projectType", "paymentType"],
              properties: {
                projectId: { type: "string" },
                projectType: { type: "string", enum: ["architect", "interior"] },
                paymentType: { type: "string", enum: ["deposit", "milestone"] },
                milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Order created" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/payment/worker/verify-payment": {
    post: {
      tags: ["payment"],
      summary: "Verify worker Razorpay payment and collect escrow funds",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "projectId",
                "projectType",
                "paymentType",
                "razorpay_order_id",
                "razorpay_payment_id",
                "razorpay_signature",
              ],
              properties: {
                projectId: { type: "string" },
                projectType: { type: "string", enum: ["architect", "interior"] },
                paymentType: { type: "string", enum: ["deposit", "milestone"] },
                milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
                razorpay_order_id: { type: "string" },
                razorpay_payment_id: { type: "string" },
                razorpay_signature: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Payment verified and escrow updated" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/payment/company/create-order": {
    post: {
      tags: ["payment"],
      summary: "Create Razorpay order for company phase payment (75/25 split, 5% platform fee)",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "milestonePercentage"],
              properties: {
                projectId: { type: "string" },
                milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Razorpay order created" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/payment/company/verify-payment": {
    post: {
      tags: ["payment"],
      summary: "Verify company Razorpay payment and release initial 75%",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "razorpay_order_id", "razorpay_payment_id", "razorpay_signature"],
              properties: {
                projectId: { type: "string" },
                milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
                razorpay_order_id: { type: "string" },
                razorpay_payment_id: { type: "string" },
                razorpay_signature: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Payment verified" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/payment/company/release-milestone": {
    post: {
      tags: ["payment"],
      summary: "Release held 25% to company and mark platform fee due",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "milestonePercentage"],
              properties: {
                projectId: { type: "string" },
                milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Milestone released" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/payment/company/summary/{projectId}": {
    get: {
      tags: ["payment"],
      summary: "Get company project payment summary",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Payment summary" },
        401: { $ref: "#/components/responses/Unauthorized" },
        404: { description: "Not found" },
      },
    },
  },
};
