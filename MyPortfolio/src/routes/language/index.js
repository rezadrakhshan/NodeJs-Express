import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.post(
  "/",
  validator.createLangValidator(),
  controller.validate,
  controller.createLang
);
app.put("/:id", controller.updateLang);
app.delete("/:id", controller.removeLang);

export default app;
