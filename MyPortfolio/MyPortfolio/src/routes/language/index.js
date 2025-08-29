import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();


/**
 * @swagger
 * /api/language/:
 *   post:
 *     tags: [Language]
 *     summary: Create Language
 *     responses:
 *       200:
 *         description: success created
 */
app.post(
  "/",
  validator.createLangValidator(),
  controller.validate,
  controller.createLang
);

/**
 * @swagger
 * /api/language/:
 *   get:
 *     tags: [Language]
 *     summary: Get All Languages
 *     responses:
 *       200:
 *         description: success Get info
 */
app.get("/", controller.getAllLang);

/**
 * @swagger
 * /api/language/:id:
 *   put:
 *     tags: [Language]
 *     summary: Update Language
 *     responses:
 *       200:
 *         description: success updated
 */
app.put("/:id", controller.updateLang);

/**
 * @swagger
 * /api/language/:id:
 *   delete:
 *     tags: [Language]
 *     summary: Delete Language
 *     responses:
 *       200:
 *         description: success Deleted
 */
app.delete("/:id", controller.removeLang);

export default app;
