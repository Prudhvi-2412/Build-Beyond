module.exports = {
  "/api/project/architect_submit": {
    post: {
      tags: ["project"],
      summary: "Submit architect hiring request",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["projectName", "description"],
              properties: {
                projectName: { type: "string" },
                description: { type: "string" },
                budget: { type: "number" },
                timeline: { type: "string" },
                referenceImages: { type: "array", items: { type: "string", format: "binary" } },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Architect request submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/design_request": {
    post: {
      tags: ["project"],
      summary: "Submit design request (interior/graphic)",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["designType", "description"],
              properties: {
                designType: { type: "string", enum: ["interior", "graphic"] },
                description: { type: "string" },
                budget: { type: "number" },
                deadline: { type: "string", format: "date" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Design request submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/construction_form": {
    post: {
      tags: ["project"],
      summary: "Submit construction project form",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["projectName", "description", "location"],
              properties: {
                projectName: { type: "string" },
                description: { type: "string" },
                location: { type: "string" },
                budget: { type: "number" },
                startDate: { type: "string", format: "date" },
                endDate: { type: "string", format: "date" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Construction project submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/projects": {
    get: {
      tags: ["project"],
      summary: "Get all projects (public)",
      parameters: [
        { name: "skip", in: "query", schema: { type: "number" } },
        { name: "limit", in: "query", schema: { type: "number" } },
        { name: "projectType", in: "query", schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Projects list retrieved" },
      },
    },
  },
  "/api/project/projects/{id}": {
    get: {
      tags: ["project"],
      summary: "Get project details by ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Project details retrieved" },
        404: { description: "Project not found" },
      },
    },
  },
  "/api/project/edit-project/{id}": {
    get: {
      tags: ["project"],
      summary: "Get project details for editing",
      security: [{ cookieAuth: [] }],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Project edit data retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
        404: { description: "Project not found" },
      },
    },
  },
  "/api/project/projects/update": {
    post: {
      tags: ["project"],
      summary: "Update project details",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                projectId: { type: "string" },
                projectName: { type: "string" },
                description: { type: "string" },
                mainImage: { type: "string", format: "binary" },
                additionalImages: { type: "array", items: { type: "string", format: "binary" } },
                completionImages: { type: "array", items: { type: "string", format: "binary" } },
                updateImages: { type: "array", items: { type: "string", format: "binary" } },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Project updated successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/submit-bid": {
    post: {
      tags: ["project"],
      summary: "Customer submits bid for project",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "bidAmount"],
              properties: {
                projectId: { type: "string" },
                bidAmount: { type: "number" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Bid submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/accept-bid": {
    post: {
      tags: ["project"],
      summary: "Customer accepts a bid",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["bidId"],
              properties: {
                bidId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Bid accepted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/decline-bid": {
    post: {
      tags: ["project"],
      summary: "Customer declines a bid",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["bidId"],
              properties: {
                bidId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Bid declined successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/approve-milestone": {
    post: {
      tags: ["project"],
      summary: "Customer approves milestone",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "milestoneId"],
              properties: {
                projectId: { type: "string" },
                milestoneId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Milestone approved successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/request-milestone-revision": {
    post: {
      tags: ["project"],
      summary: "Customer requests milestone revision",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "milestoneId", "reason"],
              properties: {
                projectId: { type: "string" },
                milestoneId: { type: "string" },
                reason: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Revision requested successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/pay-milestone": {
    post: {
      tags: ["project"],
      summary: "Customer pays for milestone",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["projectId", "milestoneId"],
              properties: {
                projectId: { type: "string" },
                milestoneId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Milestone payment initiated" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/company/unviewed-customer-messages": {
    get: {
      tags: ["project"],
      summary: "Get projects with unviewed customer messages (company view)",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Projects with unviewed messages retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/company/mark-messages-viewed/{projectId}": {
    post: {
      tags: ["project"],
      summary: "Mark customer messages as viewed (company)",
      security: [{ cookieAuth: [] }],
      parameters: [
        { name: "projectId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Messages marked as viewed" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/unviewed-company-messages": {
    get: {
      tags: ["project"],
      summary: "Get projects with unviewed company messages (customer view)",
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: "Projects with unviewed messages retrieved" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/mark-messages-viewed/{projectId}": {
    post: {
      tags: ["project"],
      summary: "Mark company messages as viewed (customer)",
      security: [{ cookieAuth: [] }],
      parameters: [
        { name: "projectId", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Messages marked as viewed" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/customer/submit-project-review": {
    post: {
      tags: ["project"],
      summary: "Customer submits project review",
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
        201: { description: "Project review submitted successfully" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/company/worker-request/accept": {
    post: {
      tags: ["project"],
      summary: "Company accepts worker request",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["requestId"],
              properties: {
                requestId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Worker request accepted" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/project/company/worker-request/reject": {
    post: {
      tags: ["project"],
      summary: "Company rejects worker request",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["requestId"],
              properties: {
                requestId: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Worker request rejected" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
};
