module.exports = {
  "/api/company/platform-fee-invoice": {
    post: {
      tags: ["company"],
      summary: "Upload invoice proof for company platform fee payment",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["projectId", "milestonePercentage", "invoice"],
              properties: {
                projectId: { type: "string" },
                milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
                invoice: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Invoice uploaded" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
};
