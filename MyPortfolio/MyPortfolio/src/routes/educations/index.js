import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import { uploadEducation } from "../../middleware/upload.js";

const app = e.Router();


/**
 * @swagger
 * /api/education/:
 *   post:
 *     tags: [Education]
 *     summary: Create Education
 *     responses:
 *       200:
 *         description: success Created
 */
app.post(
  "/",
  uploadEducation.single("image"),
  validator.createEducationValidator(),
  controller.validate,
  controller.createEducation
);


/**
 * @swagger
 * /api/education/:id:
 *   delete:
 *     tags: [Education]
 *     summary: Delete Education
 *     responses:
 *       200:
 *         description: success removed
 */
app.delete("/:id", controller.removeEducation);


/**
 * @swagger
 * /api/education/:
 *   get:
 *     tags: [Education]
 *     summary: Get All Education
 *     responses:
 *       200:
 *         description: success get info
 */
app.get("/", controller.getAllEducation);

/**
 * @swagger
 * /api/education/:id:
 *   put:
 *     tags: [Education]
 *     summary: Update Education
 *     responses:
 *       200:
 *         description: success updated
 */
app.put(
  "/:id",
  uploadEducation.single("image"),
  validator.updateEducationValidator(),
  controller.validate,
  controller.updateEducation
);


/**
 * @swagger
 * /api/education/works:
 *   get:
 *     tags: [Education]
 *     summary: Get Experience
 *     responses:
 *       200:
 *         description: success get info
 */
app.get("/works",controller.getAllWork)

export default app;
