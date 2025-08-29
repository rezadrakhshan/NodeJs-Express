import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

/**
 * @swagger
 * /api/service/:
 *   get:
 *     tags: [Service]
 *     summary: Get All services
 *     responses:
 *       200:
 *         description: success get info
 */
app.get("/", controller.getAllService);

/**
 * @swagger
 * /api/service/:
 *   post:
 *     tags: [Service]
 *     summary: Create service
 *     responses:
 *       200:
 *         description: success created
 */
app.post(
  "/",
  validator.createServiceValidator(),
  controller.validate,
  controller.createService
);

/**
 * @swagger
 * /api/service/:id:
 *   delete:
 *     tags: [Service]
 *     summary: Delete service
 *     responses:
 *       200:
 *         description: success removed
 */
app.delete("/:id", controller.removeService);

/**
 * @swagger
 * /api/service/:id:
 *   put:
 *     tags: [Service]
 *     summary: Update service
 *     responses:
 *       200:
 *         description: success updated
 */
app.put("/:id", controller.updateService);

export default app;
