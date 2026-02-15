module.exports = {
  "/api/admin/revenue/platform-intelligence": {
    get: {
      tags: ["admin"],
      summary: "Get detailed platform revenue intelligence with filters, charts and transaction ledger",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "timeframe",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["all", "week", "month", "quarter", "year"] },
        },
        {
          name: "startDate",
          in: "query",
          required: false,
          schema: { type: "string", format: "date" },
        },
        {
          name: "endDate",
          in: "query",
          required: false,
          schema: { type: "string", format: "date" },
        },
        {
          name: "projectType",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["all", "construction", "architect", "interior"] },
        },
        {
          name: "feeStatus",
          in: "query",
          required: false,
          schema: { type: "string", enum: ["all", "collected", "pending", "yet_to_come"] },
        },
        {
          name: "search",
          in: "query",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "page",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1, default: 1 },
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: { type: "integer", minimum: 1, default: 20 },
        },
      ],
      responses: {
        200: { description: "Intelligence payload" },
        401: { $ref: "#/components/responses/Unauthorized" },
        500: { description: "Server error" },
      },
    },
  },
};
