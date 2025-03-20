import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.get("/", controller.getAllSkill);

app.post(
  "/",
  validator.createSkillValidator(),
  controller.validate,
  controller.createSkill
);

app.delete("/:id", controller.removeskill);

app.put("/:id", controller.updateSkill);

export default app;
