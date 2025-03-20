import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.post(
  "/",
  validator.contactValidator(),
  controller.validate,
  controller.contact
);

export default app;
