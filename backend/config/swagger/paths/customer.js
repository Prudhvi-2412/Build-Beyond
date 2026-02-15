module.exports = {
	"/api/customer/profile": {
		get: {
			tags: ["customer"],
			summary: "Get logged-in customer profile",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Customer profile retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Customer not found" },
			},
		},
	},
	"/api/customer/home": {
		get: {
			tags: ["customer"],
			summary: "Get customer dashboard home",
			responses: {
				200: { description: "Dashboard data retrieved" },
			},
		},
	},
	"/api/customer/customerdashboard": {
		get: {
			tags: ["customer"],
			summary: "Get customer dashboard",
			responses: {
				200: { description: "Dashboard retrieved" },
			},
		},
	},
	"/api/customer/architect": {
		get: {
			tags: ["customer"],
			summary: "Get list of architects",
			responses: {
				200: { description: "Architects list retrieved" },
			},
		},
	},
	"/api/customer/architect_form": {
		get: {
			tags: ["customer"],
			summary: "Get architect form template",
			responses: {
				200: { description: "Form template retrieved" },
			},
		},
	},
	"/api/customer/design_ideas": {
		get: {
			tags: ["customer"],
			summary: "Get design inspiration ideas",
			responses: {
				200: { description: "Design ideas retrieved" },
			},
		},
	},
	"/api/customer/constructionform": {
		get: {
			tags: ["customer"],
			summary: "Get construction form template",
			responses: {
				200: { description: "Form template retrieved" },
			},
		},
		post: {
			tags: ["customer"],
			summary: "Submit construction project form",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["projectName", "description"],
							properties: {
								projectName: { type: "string" },
								description: { type: "string" },
								location: { type: "string" },
								budget: { type: "number" },
							},
						},
					},
				},
			},
			responses: {
				201: { description: "Construction form submitted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/bidForm_Submit": {
		post: {
			tags: ["customer"],
			summary: "Submit construction bid form with site and floor images",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["projectName", "totalArea", "buildingType", "totalFloors"],
							properties: {
								projectName: { type: "string" },
								totalArea: { type: "number" },
								buildingType: {
									type: "string",
									enum: ["residential", "commercial", "industrial", "mixedUse", "other"],
								},
								totalFloors: { type: "integer", minimum: 1 },
								siteFiles: {
									type: "array",
									items: { type: "string", format: "binary" },
								},
								floorImages: {
									type: "array",
									items: { type: "string", format: "binary" },
								},
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Bid form submitted successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/bidform": {
		get: {
			tags: ["customer"],
			summary: "Get bid form template",
			responses: {
				200: { description: "Bid form template retrieved" },
			},
		},
	},
	"/api/customer/job_status": {
		get: {
			tags: ["customer"],
			summary: "Get job/bid request status",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Job status retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/construction_companies_list": {
		get: {
			tags: ["customer"],
			summary: "Get list of construction companies",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Companies list retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/ongoing_projects": {
		get: {
			tags: ["customer"],
			summary: "Get customer ongoing projects",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Ongoing projects retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/interiordesign_form": {
		get: {
			tags: ["customer"],
			summary: "Get interior design request form",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Interior design form retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/interior_designer": {
		get: {
			tags: ["customer"],
			summary: "Get list of interior designers",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Interior designers list retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/customersettings": {
		get: {
			tags: ["customer"],
			summary: "Get customer account settings",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Settings retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/bidspace": {
		get: {
			tags: ["customer"],
			summary: "Get bid space for projects",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Bid space data retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/favorites": {
		get: {
			tags: ["customer"],
			summary: "Get customer favorite designs",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Favorites list retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
		post: {
			tags: ["customer"],
			summary: "Save design as favorite",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["designId"],
							properties: {
								designId: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				201: { description: "Design saved to favorites" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/favorites/{id}": {
		delete: {
			tags: ["customer"],
			summary: "Remove design from favorites",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "id", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Design removed from favorites" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Favorite not found" },
			},
		},
	},
	"/api/customer/accept-proposal/{type}/{id}": {
		get: {
			tags: ["customer"],
			summary: "Accept proposal from worker",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "type", in: "path", required: true, schema: { type: "string" } },
				{ name: "id", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Proposal accepted" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Proposal not found" },
			},
		},
	},
	"/api/customer/accept-bid/{bidId}/{companyBidId}": {
		get: {
			tags: ["customer"],
			summary: "Accept bid from company",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "bidId", in: "path", required: true, schema: { type: "string" } },
				{ name: "companyBidId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Bid accepted" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Bid not found" },
			},
		},
	},
	"/api/customer/accept-company-proposal/{projectId}": {
		get: {
			tags: ["customer"],
			summary: "Accept company proposal",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Company proposal accepted" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Proposal not found" },
			},
		},
	},
	"/api/customer/accept-proposal": {
		post: {
			tags: ["customer"],
			summary: "Accept construction proposal",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["proposalId"],
							properties: {
								proposalId: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Proposal accepted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/reject-company-proposal/{projectId}": {
		post: {
			tags: ["customer"],
			summary: "Reject company proposal",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
			],
			requestBody: {
				required: false,
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								reason: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Proposal rejected" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/password/update": {
		post: {
			tags: ["customer"],
			summary: "Update customer password",
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
	"/api/customer/milestone/approve/{projectId}/{milestoneId}": {
		post: {
			tags: ["customer"],
			summary: "Approve a milestone",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
				{ name: "milestoneId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Milestone approved successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/milestone/reject/{projectId}/{milestoneId}": {
		post: {
			tags: ["customer"],
			summary: "Reject a milestone",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
				{ name: "milestoneId", in: "path", required: true, schema: { type: "string" } },
			],
			requestBody: {
				required: false,
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								reason: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Milestone rejected" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/milestone/request-revision/{projectId}/{milestoneId}": {
		post: {
			tags: ["customer"],
			summary: "Request milestone revision",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
				{ name: "milestoneId", in: "path", required: true, schema: { type: "string" } },
			],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["feedback"],
							properties: {
								feedback: { type: "string" },
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
	"/api/customer/milestone/report-to-admin/{projectId}/{milestoneId}": {
		post: {
			tags: ["customer"],
			summary: "Report milestone issue to admin",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
				{ name: "milestoneId", in: "path", required: true, schema: { type: "string" } },
			],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["issue", "description"],
							properties: {
								issue: { type: "string" },
								description: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Issue reported to admin" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/review": {
		post: {
			tags: ["customer"],
			summary: "Submit customer review for project worker",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["projectType", "projectId", "rating"],
							properties: {
								projectType: { type: "string", enum: ["construction", "architect", "interior"] },
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
	"/api/customer/review-status/{projectType}/{projectId}": {
		get: {
			tags: ["customer"],
			summary: "Get customer review submission status",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectType", in: "path", required: true, schema: { type: "string" } },
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Review status retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/architect-hiring/{projectId}": {
		get: {
			tags: ["customer"],
			summary: "Get architect hiring project details",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Project details retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Project not found" },
			},
		},
	},
	"/api/customer/design-request/{projectId}": {
		get: {
			tags: ["customer"],
			summary: "Get design request project details",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "projectId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Project details retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Project not found" },
			},
		},
	},
	"/api/customer/payment-history": {
		get: {
			tags: ["customer"],
			summary: "Get customer payment history",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Payment history retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
};
