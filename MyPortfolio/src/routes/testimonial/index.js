import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";

const app = e.Router();

app.post(
  "/",
  upload.single("image"),
  validator.createTestimonialValidator(),
  controller.validate,
  controller.createTestimonial
);

export default app;
