import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.post(
  "/",
  validator.createServiceValidator(),
  controller.validate,
  controller.createService
);
app.delete("/:id", controller.removeService);

export default app;
