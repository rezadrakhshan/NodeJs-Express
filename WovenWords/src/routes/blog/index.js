import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";
import upload from "../../middleware/upload.js";
import countingVisits from "../../middleware/blog.js";
import { isUserAdmin } from "../../middleware/user.js";

const router = e.Router();

/**
 * @swagger
 * /blog/:
 *   post:
 *     tags: [Blog]
 *     summary: Create Blog
 *     responses:
 *       200:
 *         description: success created
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
 * /blog/:
 *   get:
 *     tags: [Blog]
 *     summary: get all Blog
 *     responses:
 *       200:
 *         description: success get data
 */
router.get("/", controller.getAllBlog);

/**
 * @swagger
 * /blog/:id:
 *   get:
 *     tags: [Blog]
 *     summary: Get Single Blog
 *     responses:
 *       200:
 *         description: success Get inforamation
 */
router.get("/:id", countingVisits, controller.getSingleBlog);

/**
 * @swagger
 * /blog/:id:
 *   delete:
 *     tags: [Blog]
 *     summary: Remove Blog
 *     responses:
 *       200:
 *         description: success Removed
 */
router.delete("/:id", controller.removeBlog);


/**
 * @swagger
 * /blog/:id:
 *   put:
 *     tags: [Blog]
 *     summary: Update Blog
 *     responses:
 *       200:
 *         description: success updated
 */
router.put(
  "/:id",
  upload.single("image"),
  validator.updateBlogValidator(),
  controller.validate,
  controller.updateBlog
);

export default router;
