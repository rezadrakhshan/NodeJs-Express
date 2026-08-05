import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const router = e.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCommentRequest:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           minLength: 10
 *           maxLength: 300
 *           example: This is a great article. Thanks for sharing!
 */

/**
 * @swagger
 * /comment/{id}:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Create Comment
 *     description: Create a new comment for a blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID
 *         schema:
 *           type: string
 *         example: 6890b6b9df4dff8f7f52b7f2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentRequest'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/:id",
  validator.createCommentValidator(),
  controller.validate,
  controller.createComment
);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: Remove Comment
 *     description: Delete a comment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *         example: 6890b6b9df4dff8f7f52b7f2
 *     responses:
 *       200:
 *         description: Comment removed successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", controller.removeComment);

export default router;
