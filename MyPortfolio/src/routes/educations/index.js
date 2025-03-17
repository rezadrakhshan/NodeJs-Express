import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.post(
  "/",
  validator.createEducationValidator(),
  controller.validate,
  controller.createEducation
);

app.delete("/:id", controller.removeEducation);

app.get("/", controller.getAllEducation);

app.put(
  "/:id",
  validator.updateEducationValidator(),
  controller.validate,
  controller.updateEducation
);

export default app;
