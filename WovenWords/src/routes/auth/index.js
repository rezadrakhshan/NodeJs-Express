import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const router = e.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: register
 *     responses:
 *       200:
 *         description: success register
 */
router.post(
  "/register",
  validator.registerValidator(),
  controller.validate,
  controller.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: login
 *     responses:
 *       200:
 *         description: success login
 */
router.post(
  "/login",
  validator.loginValidator(),
  controller.validate,
  controller.login
);

export default router;
