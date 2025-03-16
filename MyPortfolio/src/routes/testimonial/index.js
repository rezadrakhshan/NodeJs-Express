import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import { uploadTestimonial } from "../../middleware/upload.js";

const app = e.Router();

app.post(
  "/",
  uploadTestimonial.single("image"),
  validator.createTestimonialValidator(),
  controller.validate,
  controller.createTestimonial
);

app.get("/", controller.getAllTestimonial);

app.delete("/:id", controller.removeTestimonial);

export default app;
