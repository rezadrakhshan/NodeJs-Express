import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import { uploadTestimonial } from "../../middleware/upload.js";

const app = e.Router();

/**
 * @swagger
 * /api/testimonial/:
 *   post:
 *     tags: [Testimonial]
 *     summary: Create testimonial
 *     responses:
 *       200:
 *         description: success created
 */
app.post(
  "/",
  uploadTestimonial.single("image"),
  validator.createTestimonialValidator(),
  controller.validate,
  controller.createTestimonial
);

/**
 * @swagger
 * /api/testimonial/:
 *   post:
 *     tags: [Testimonial]
 *     summary: Get All testimonials
 *     responses:
 *       200:
 *         description: success get info
 */
app.get("/", controller.getAllTestimonial);

/**
 * @swagger
 * /api/testimonial/:id:
 *   delete:
 *     tags: [Testimonial]
 *     summary: Delete testimonial
 *     responses:
 *       200:
 *         description: success removed
 */
app.delete("/:id", controller.removeTestimonial);

/**
 * @swagger
 * /api/testimonial/:id:
 *   put:
 *     tags: [Testimonial]
 *     summary: Update testimonial
 *     responses:
 *       200:
 *         description: success updated
 */
app.put(
  "/:id",
  uploadTestimonial.single("image"),
  controller.updateTestimonial
);

export default app;
