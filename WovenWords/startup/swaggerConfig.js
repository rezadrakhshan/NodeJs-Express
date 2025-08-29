import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ٌWowenWords",
      version: "1.0.0",
      description: "WowenWords Document",
    },
    tags: [{ name: "Auth" }, { name: "Blog" }, { name: "Comment" }],
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
