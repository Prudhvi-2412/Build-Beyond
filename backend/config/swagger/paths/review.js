module.exports = {
  "/api/review/customer/review": {
    post: {
      tags: ["review"],
      summary: "Submit review from customer for worker/project",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "rating", "comment"],
              properties: {
                projectId: { type: "string" },
                rating: { type: "number", minimum: 1, maximum: 5 },
                comment: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Review submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/review/worker/review": {
    post: {
      tags: ["review"],
      summary: "Submit review from worker for customer/project",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "rating", "comment"],
              properties: {
                projectId: { type: "string" },
                rating: { type: "number", minimum: 1, maximum: 5 },
                comment: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Review submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/review/project-review-status/{projectType}/{projectId}": {
    get: {
      tags: ["review"],
      summary: "Get review status for a specific project",
      parameters: [
        { name: "projectType", in: "path", required: true, schema: { type: "string", enum: ["construction", "architect", "interior"] } },
        { name: "projectId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Review status retrieved" },
        404: { description: "Project not found" },
      },
    },
  },
};
