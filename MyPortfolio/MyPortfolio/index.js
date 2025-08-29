import e from "express";
import debug from "debug";
import db from "./startup/db.js";
import logging from "./startup/logging.js";
import config from "./startup/config.js";
import router from "./src/routes/index.js";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT || 3000;
const log = debug("app:main");
const app = e();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      description: "Portfolio API Information",
    },
    tags: [
      { name: "Blog" },
      { name: "Service" },
      { name: "Contact" },
      { name: "Language" },
      { name: "Skill" },
      { name: "Testimonial" }, 
      { name: "Education" },
      { name: "Portfolio" },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

config(app, e);
db();
logging();

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", router);

app.listen(port, () => log(`app ruuning on port ${port}`));
export default [log];
