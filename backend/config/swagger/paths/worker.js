module.exports = {
	"/api/worker/home": {
		get: {
			tags: ["worker"],
			summary: "Get worker dashboard home",
			responses: {
				200: { description: "Dashboard data retrieved" },
			},
		},
	},
	"/api/worker/ongoing-projects": {
		get: {
			tags: ["worker"],
			summary: "Get worker ongoing projects",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Ongoing projects retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/dashboard": {
		get: {
			tags: ["worker"],
			summary: "Get worker dashboard",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Dashboard retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/jobtab": {
		get: {
			tags: ["worker"],
			summary: "Get job listings for worker",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Job listings retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/search-jobs": {
		get: {
			tags: ["worker"],
			summary: "Search available jobs by keyword and location",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "keyword", in: "query", schema: { type: "string" } },
				{ name: "location", in: "query", schema: { type: "string" } },
				{ name: "skip", in: "query", schema: { type: "integer", default: 0 } },
				{ name: "limit", in: "query", schema: { type: "integer", default: 10 } },
			],
			responses: {
				200: { description: "Job search results with filters applied" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/company/{companyId}/join": {
		post: {
			tags: ["worker"],
			summary: "Request to join a construction company",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "companyId", in: "path", required: true, schema: { type: "string" } },
			],
			requestBody: {
				required: false,
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								message: { type: "string" },
								coverLetter: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Join request sent to company" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Company not found" },
			},
		},
	},
	"/api/worker/companies": {
		get: {
			tags: ["worker"],
			summary: "Get list of all available companies to join",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Companies list retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/my-companies": {
		get: {
			tags: ["worker"],
			summary: "Get companies worker is currently affiliated with",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Affiliated companies retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/sent-companies": {
		get: {
			tags: ["worker"],
			summary: "Get companies worker has sent join requests to",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Pending join requests retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/requests": {
		get: {
			tags: ["worker"],
			summary: "Get worker received company join requests/offers",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Requests and offers retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/leaderboard": {
		get: {
			tags: ["worker"],
			summary: "Get worker leaderboard/rankings by ratings",
			responses: {
				200: { description: "Leaderboard retrieved" },
			},
		},
	},
	"/api/worker/profile": {
		get: {
			tags: ["worker"],
			summary: "Get logged-in worker profile details",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Worker profile retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/profile/update": {
		post: {
			tags: ["worker"],
			summary: "Update worker profile with image and details",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							properties: {
								profileImage: { type: "string", format: "binary" },
								name: { type: "string" },
								about: { type: "string" },
								title: { type: "string" },
								expectedPrice: { type: "number" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Profile updated successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/password/update": {
		post: {
			tags: ["worker"],
			summary: "Update worker account password",
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
	"/api/worker/availability": {
		post: {
			tags: ["worker"],
			summary: "Update worker work availability status",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["status"],
							properties: {
								status: { type: "string", enum: ["available", "busy", "unavailable"] },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Availability status updated" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/project/{projectId}": {
		get: {
			tags: ["worker"],
			summary: "Get project details for worker",
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
	"/api/worker/submit-proposal": {
		post: {
			tags: ["worker"],
			summary: "Submit proposal for available project",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["projectId", "price"],
							properties: {
								projectId: { type: "string" },
								price: { type: "number", minimum: 0 },
								description: { type: "string" },
								timeline: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				201: { description: "Proposal submitted successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/project-update": {
		post: {
			tags: ["worker"],
			summary: "Submit project progress update with image",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["projectId", "description"],
							properties: {
								projectId: { type: "string" },
								description: { type: "string" },
								progressImage: { type: "string", format: "binary" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Progress update submitted successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/submit-milestone": {
		post: {
			tags: ["worker"],
			summary: "Submit milestone with progress percentage and proof image",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["projectId", "percentage", "description"],
							properties: {
								projectId: { type: "string" },
								percentage: { type: "integer", enum: [25, 50, 75, 100] },
								description: { type: "string" },
								milestoneImage: { type: "string", format: "binary" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Milestone submitted successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/review": {
		post: {
			tags: ["worker"],
			summary: "Submit worker review for customer/project",
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
	"/api/worker/review-status/{projectType}/{projectId}": {
		get: {
			tags: ["worker"],
			summary: "Get worker review submission status for project",
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
	"/api/worker/offers": {
		get: {
			tags: ["worker"],
			summary: "Get offers sent to worker from companies",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Offers list retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/offers/accept/{offerId}": {
		post: {
			tags: ["worker"],
			summary: "Accept offer from company or project",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "offerId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Offer accepted successfully" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Offer not found" },
			},
		},
	},
	"/api/worker/offers/reject/{offerId}": {
		post: {
			tags: ["worker"],
			summary: "Reject offer from company or project",
			security: [{ cookieAuth: [] }],
			parameters: [
				{ name: "offerId", in: "path", required: true, schema: { type: "string" } },
			],
			responses: {
				200: { description: "Offer rejected successfully" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Offer not found" },
			},
		},
	},
	"/api/worker/skills": {
		get: {
			tags: ["worker"],
			summary: "Get worker's skills list",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Skills retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
		post: {
			tags: ["worker"],
			summary: "Add new skill to worker profile",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["skillName"],
							properties: {
								skillName: { type: "string" },
								proficiency: { type: "string", enum: ["beginner", "intermediate", "expert"] },
							},
						},
					},
				},
			},
			responses: {
				201: { description: "Skill added successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/earnings": {
		get: {
			tags: ["worker"],
			summary: "Get worker total earnings and breakdown",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Earnings retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/portfolio": {
		get: {
			tags: ["worker"],
			summary: "Get worker portfolio of completed projects",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Portfolio projects retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/certifications": {
		get: {
			tags: ["worker"],
			summary: "Get worker's certifications",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Certifications retrieved" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
		post: {
			tags: ["worker"],
			summary: "Add certification to worker profile",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["certificationName", "issuer"],
							properties: {
								certificationName: { type: "string" },
								issuer: { type: "string" },
								issuedDate: { type: "string", format: "date" },
								expiryDate: { type: "string", format: "date" },
							},
						},
					},
				},
			},
			responses: {
				201: { description: "Certification added successfully" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
};
