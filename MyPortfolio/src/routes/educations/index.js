import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import { uploadEducation } from "../../middleware/upload.js";

const app = e.Router();

app.post(
  "/",
  uploadEducation.single("image"),
  validator.createEducationValidator(),
  controller.validate,
  controller.createEducation
);

app.delete("/:id", controller.removeEducation);

app.get("/", controller.getAllEducation);

app.put(
  "/:id",
  uploadEducation.single("image"),
  validator.updateEducationValidator(),
  controller.validate,
  controller.updateEducation
);

export default app;
