import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

/**
 * @swagger
 * /api/skill/:
 *   get:
 *     tags: [Skill]
 *     summary: Get All skills
 *     responses:
 *       200:
 *         description: success get info
 */
app.get("/", controller.getAllSkill);


/**
 * @swagger
 * /api/skill/:
 *   post:
 *     tags: [Skill]
 *     summary: Create skill
 *     responses:
 *       200:
 *         description: success created
 */
app.post(
  "/",
  validator.createSkillValidator(),
  controller.validate,
  controller.createSkill
);

/**
 * @swagger
 * /api/skill/:id:
 *   delete:
 *     tags: [Skill]
 *     summary: Delete skill
 *     responses:
 *       200:
 *         description: success removed
 */
app.delete("/:id", controller.removeskill);

/**
 * @swagger
 * /api/skill/:id:
 *   put:
 *     tags: [Skill]
 *     summary: Update skill
 *     responses:
 *       200:
 *         description: success updated
 */
app.put("/:id", controller.updateSkill);

export default app;
