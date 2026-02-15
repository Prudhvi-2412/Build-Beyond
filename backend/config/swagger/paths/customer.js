module.exports = {
	"/api/customer/profile": {
		get: {
			tags: ["customer"],
			summary: "Get logged-in customer profile",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Customer profile" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { description: "Customer not found" },
			},
		},
	},
	"/api/bidForm_Submit": {
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
				200: { description: "Bid form submitted" },
				400: { $ref: "#/components/responses/BadRequest" },
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
				200: { description: "Password updated" },
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
				{
					name: "projectId",
					in: "path",
					required: true,
					schema: { type: "string" },
				},
				{
					name: "milestoneId",
					in: "path",
					required: true,
					schema: { type: "string" },
				},
			],
			responses: {
				200: { description: "Milestone approved" },
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
				{
					name: "projectId",
					in: "path",
					required: true,
					schema: { type: "string" },
				},
				{
					name: "milestoneId",
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
							properties: {
								feedback: { type: "string" },
								reason: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Revision requested" },
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
				200: { description: "Review submitted" },
				400: { $ref: "#/components/responses/BadRequest" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/api/customer/payment-history": {
		get: {
			tags: ["customer"],
			summary: "Get customer payment history",
			security: [{ cookieAuth: [] }],
			responses: {
				200: { description: "Payment history" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
};
