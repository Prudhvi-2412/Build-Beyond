module.exports = {
  "/api/company/companydashboard": {
    get: {
      tags: ["company"],
      summary: "Get company dashboard data",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Company dashboard retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/companyongoing_projects": {
    get: {
      tags: ["company"],
      summary: "Get ongoing projects for company",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Ongoing projects list retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/project_requests": {
    get: {
      tags: ["company"],
      summary: "Get project requests for company",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Project requests retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/projects/{projectId}/{status}": {
    patch: {
      tags: ["company"],
      summary: "Update project status",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
        {
          name: "status",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Project status updated" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/companyhiring": {
    get: {
      tags: ["company"],
      summary: "Get hiring requests for company",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Hiring requests retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/companytoworker": {
    post: {
      tags: ["company"],
      summary: "Create hire request for worker",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["position", "location", "salary", "workerId"],
              properties: {
                position: { type: "string" },
                location: { type: "string" },
                salary: { type: "number" },
                workerId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Hire request created" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/companysettings": {
    get: {
      tags: ["company"],
      summary: "Get company settings",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Company settings retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/companybids": {
    get: {
      tags: ["company"],
      summary: "Get bids for company projects",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Bids retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/companyrevenue": {
    get: {
      tags: ["company"],
      summary: "Get company revenue summary",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Revenue data retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/my-employees": {
    get: {
      tags: ["company"],
      summary: "Get company employees list",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Employees list retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/revenue_form": {
    get: {
      tags: ["company"],
      summary: "Get company revenue form view metadata",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Revenue form metadata retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/worker-request/{requestId}": {
    patch: {
      tags: ["company"],
      summary: "Handle worker request (accept/reject)",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "requestId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["action"],
              properties: {
                action: { type: "string", enum: ["accept", "reject"] },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Worker request handled" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/update-company-profile": {
    post: {
      tags: ["company"],
      summary: "Update company profile",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["profileType"],
              properties: {
                profileType: {
                  type: "string",
                  enum: ["worker", "customer"],
                },
                companyLocation: { type: "string" },
                companySize: { type: "string" },
                specializations: { type: "string" },
                aboutCompany: { type: "string" },
                whyJoinUs: { type: "string" },
                currentOpenings: { type: "string" },
                projectsCompleted: { type: "string" },
                yearsInBusiness: { type: "string" },
                customerAboutCompany: { type: "string" },
                didYouKnow: { type: "string" },
                completedProjects: { type: "string" },
                projectBeforeImages: {
                  type: "array",
                  items: { type: "string", format: "binary" },
                },
                projectAfterImages: {
                  type: "array",
                  items: { type: "string", format: "binary" },
                },
                certificateFiles: {
                  type: "array",
                  items: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Company profile updated" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/submit-bid": {
    post: {
      tags: ["company"],
      summary: "Submit bid for architecture design request",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["bidId", "bidPrice", "companyName", "companyId"],
              properties: {
                bidId: { type: "string" },
                bidPrice: { type: "number" },
                companyName: { type: "string" },
                companyId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Bid submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/submit-proposal": {
    post: {
      tags: ["company"],
      summary: "Submit project proposal",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "price", "description", "phases"],
              properties: {
                projectId: { type: "string" },
                price: { type: "number" },
                description: { type: "string" },
                phases: {
                  type: "array",
                  minItems: 4,
                  maxItems: 4,
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      percentage: { type: "number", enum: [25] },
                      amount: { type: "number" },
                      description: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Proposal submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/company/password/update": {
    post: {
      tags: ["company"],
      summary: "Update company password",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["currentPassword", "newPassword"],
              properties: {
                currentPassword: { type: "string" },
                newPassword: { type: "string", minLength: 8 },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password updated successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
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
                milestonePercentage: {
                  type: "number",
                  enum: [25, 50, 75, 100],
                },
                invoice: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Invoice uploaded successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
};
