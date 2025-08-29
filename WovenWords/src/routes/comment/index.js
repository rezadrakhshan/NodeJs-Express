import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const router = e.Router();

/**
 * @swagger
 * /comment/:id:
 *   post:
 *     tags: [Comment]
 *     summary: Create Comment
 *     responses:
 *       200:
 *         description: success created
 */
router.post(
  "/:id",
  validator.createCommentValidator(),
  controller.validate,
  controller.createComment
);


/**
 * @swagger
 * /comment/:id:
 *   delete:
 *     tags: [Comment]
 *     summary: Remove Comment
 *     responses:
 *       200:
 *         description: success removed
 */
router.delete("/:id", controller.removeComment);

export default router;
