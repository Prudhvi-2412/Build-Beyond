const swaggerUi = require("swagger-ui-express");
const { buildSwaggerSpec } = require("./specBuilder");
const { generatePathsFromAppRoutes } = require("./pathGenerators");

const setupSwagger = (app, routeMounts = []) => {
  const spec = buildSwaggerSpec(routeMounts);
  const appLevelPaths = generatePathsFromAppRoutes(app);

  spec.paths = {
    ...appLevelPaths,
    ...(spec.paths || {}),
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
  app.get("/api-docs.json", (_req, res) => {
    res.status(200).json(spec);
  });
};

module.exports = { setupSwagger };
