import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";
import countingVisits from "../../middleware/blog.js";
import { isUserAdmin } from "../../middleware/user.js";

const router = e.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateBlogRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           minLength: 10
 *           maxLength: 100
 *           example: Learning Express.js
 *         content:
 *           type: string
 *           minLength: 10
 *           example: This is my first blog...
 *         status:
 *           type: string
 *           example: published
 *         image:
 *           type: string
 *           format: binary
 *
 *     UpdateBlogRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 10
 *           maxLength: 100
 *           example: Updated title
 *         content:
 *           type: string
 *           minLength: 10
 *           example: Updated content...
 *         status:
 *           type: string
 *           example: draft
 *         image:
 *           type: string
 *           format: binary
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create Blog
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlogRequest'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only admins can create blogs
 */
router.post(
  "/",
  isUserAdmin,
  upload.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

/**
 * @swagger
 * /blog:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 */
router.get("/", controller.getAllBlog);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get single blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6890b6b9df4dff8f7f52b7f2
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *       404:
 *         description: Blog not found
 */
router.get("/:id", countingVisits, controller.getSingleBlog);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6890b6b9df4dff8f7f52b7f2
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", controller.removeBlog);


/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     tags:
 *       - Blog
 *     summary: Update blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6890b6b9df4dff8f7f52b7f2
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBlogRequest'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put(
  "/:id",
  upload.single("image"),
  validator.updateBlogValidator(),
  controller.validate,
  controller.updateBlog
);

export default router;
