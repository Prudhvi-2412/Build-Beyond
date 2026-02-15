const swaggerJsdoc = require("swagger-jsdoc");
const pathOverrides = require("./paths");
const { buildSwaggerOptions } = require("./options");
const { generatePathsFromMounts } = require("./pathGenerators");

const buildSwaggerSpec = (routeMounts = []) => {
  const options = buildSwaggerOptions();
  const jsdocSpec = swaggerJsdoc(options);
  const generatedPaths = generatePathsFromMounts(routeMounts);

  return {
    ...jsdocSpec,
    paths: {
      ...generatedPaths,
      ...(jsdocSpec.paths || {}),
      ...pathOverrides,
    },
  };
};

module.exports = { buildSwaggerSpec };
