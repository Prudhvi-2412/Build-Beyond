module.exports = {
	"/api/worker/ongoing-projects": {
		get: {
			tags: ["worker"],
			summary: "Get worker ongoing projects",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Ongoing projects" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/profile/update": {
		post: {
			tags: ["worker"],
			summary: "Update worker profile and attachments",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: false,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							properties: {
								name: { type: "string" },
								phone: { type: "string" },
								about: { type: "string" },
								professionalTitle: { type: "string" },
								expectedPrice: { type: "string" },
								profileImage: { type: "string", format: "binary" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Profile updated" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/password/update": {
		post: {
			tags: ["worker"],
			summary: "Update worker password",
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
				200: { description: "Password updated" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/availability": {
		post: {
			tags: ["worker"],
			summary: "Update worker availability status",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["availability"],
							properties: {
								availability: { type: "string", enum: ["available", "busy", "unavailable"] },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Availability updated" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/submit-proposal": {
		post: {
			tags: ["worker"],
			summary: "Submit proposal for assigned project",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["projectType", "projectId", "price"],
							properties: {
								projectType: { type: "string", enum: ["architect", "interior"] },
								projectId: { type: "string" },
								price: { type: "number", minimum: 0 },
								description: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Proposal submitted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/project-update": {
		post: {
			tags: ["worker"],
			summary: "Post project progress update with optional image",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["projectType", "projectId", "updateText"],
							properties: {
								projectType: { type: "string", enum: ["construction", "architect", "interior"] },
								projectId: { type: "string" },
								updateText: { type: "string" },
								updateImage: { type: "string", format: "binary" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Project update posted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/submit-milestone": {
		post: {
			tags: ["worker"],
			summary: "Submit milestone proof with image",
			security: [{ cookieAuth: [] }],
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["projectType", "projectId", "milestonePercentage", "description", "image"],
							properties: {
								projectType: { type: "string", enum: ["construction", "architect", "interior"] },
								projectId: { type: "string" },
								milestonePercentage: { type: "number", enum: [25, 50, 75, 100] },
								description: { type: "string" },
								image: { type: "string", format: "binary" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Milestone submitted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/review": {
		post: {
			tags: ["worker"],
			summary: "Submit worker review for customer",
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
				200: { description: "Review submitted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/worker/review-status/{projectType}/{projectId}": {
		get: {
			tags: ["worker"],
			summary: "Get worker review submission status for a project",
			security: [{ cookieAuth: [] }],
			parameters: [
				{
					name: "projectType",
					in: "path",
					required: true,
					schema: { type: "string", enum: ["construction", "architect", "interior"] },
				},
				{
					name: "projectId",
					in: "path",
					required: true,
					schema: { type: "string" },
				},
			],
			responses: {
				200: { description: "Review status" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
};
