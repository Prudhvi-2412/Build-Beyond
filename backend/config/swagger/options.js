const path = require("path");
const components = require("./components");

const buildSwaggerOptions = () => ({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Build & Beyond API",
      version: "1.0.0",
      description: "Auto-generated API documentation for Build & Beyond backend routes.",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
        description: "Local server",
      },
    ],
    components,
  },
  apis: [path.join(__dirname, "../routes/*.js")],
});

module.exports = { buildSwaggerOptions };
