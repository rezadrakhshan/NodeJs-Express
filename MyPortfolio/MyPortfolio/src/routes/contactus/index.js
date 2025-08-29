import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

/**
 * @swagger
 * /api/contact/:
 *   post:
 *     tags: [Contact]
 *     summary: Contact Us
 *     responses:
 *       200:
 *         description: Message sent
 */
app.post(
  "/",
  validator.contactValidator(),
  controller.validate,
  controller.contact
);

export default app;
