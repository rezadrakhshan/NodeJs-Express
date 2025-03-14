import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.post(
  "/",
  validator.createSkillValidator(),
  controller.validate,
  controller.createSkill
);

export default app;
