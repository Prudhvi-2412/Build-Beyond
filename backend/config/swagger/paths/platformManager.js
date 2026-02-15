module.exports = {
  "/api/platform-manager/company-payments": {
    get: {
      tags: ["platform-manager"],
      summary: "Get unified pending platform fee queue for company and worker projects",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Queue items" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/platform-manager/company-payments/{projectId}/{milestonePercentage}/collect": {
    post: {
      tags: ["platform-manager"],
      summary: "Verify and mark platform fee collected for company/worker milestone",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
        {
          name: "milestonePercentage",
          in: "path",
          required: true,
          schema: { type: "number" },
        },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                projectType: { type: "string", enum: ["construction", "architect", "interior"] },
                notes: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Platform fee collected" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
};
