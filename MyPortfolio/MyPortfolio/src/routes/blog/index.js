import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import { uploadBlog } from "../../middleware/upload.js";

const app = e.Router();

/**
 * @swagger
 * /api/blog/:
 *   post:
 *     tags: [Blog]
 *     summary: Create Blog
 *     responses:
 *       200:
 *         description: success Created
 */
app.post(
  "/",
  uploadBlog.single("image"),
  validator.createBlogValidator(),
  controller.validate,
  controller.createBlog
);

/**
 * @swagger
 * /api/blog/:
 *   get:
 *     tags: [Blog]
 *     summary: Get All Blog
 *     responses:
 *       200:
 *         description: success get information
 */
app.get("/", controller.getAllBlog);
/**
 * @swagger
 * /api/blog/:id:
 *   get:
 *     tags: [Blog]
 *     summary: Get Single Blog
 *     responses:
 *       200:
 *         description: success get information
 */
app.get("/:id", controller.getSingleBlog);

/**
 * @swagger
 * /api/blog/:id:
 *   delete:
 *     tags: [Blog]
 *     summary: Delete Blog
 *     responses:
 *       200:
 *         description: success removed
 */
app.delete("/:id", controller.removeBlog);

/**
 * @swagger
 * /api/blog/:id:
 *   put:
 *     tags: [Blog]
 *     summary: Update Blog
 *     responses:
 *       200:
 *         description: success updated
 */
app.put(
  "/:id",
  uploadBlog.single("image"),
  validator.updateBlogValidator(),
  controller.validate,
  controller.updateBlog
);

export default app;
