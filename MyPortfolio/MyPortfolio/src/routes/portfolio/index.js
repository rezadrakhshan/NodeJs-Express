import e from "express";
import { uploadPortfolio } from "../../middleware/upload.js";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

/**
 * @swagger
 * /api/portfolio/:
 *   post:
 *     tags: [Portfolio]
 *     summary: Create portfolio
 *     responses:
 *       200:
 *         description: success created
 */
app.post(
  "/",
  uploadPortfolio.array("gallery"),
  validator.createPortfolioValidator(),
  controller.validate,
  controller.createPortfolio
);

/**
 * @swagger
 * /api/portfolio/:
 *   get:
 *     tags: [Portfolio]
 *     summary: Get All portfolio
 *     responses:
 *       200:
 *         description: success get info
 */
app.get("/", controller.getPortfolio);

/**
 * @swagger
 * /api/portfolio/:id:
 *   delete:
 *     tags: [Portfolio]
 *     summary: Delete portfolio
 *     responses:
 *       200:
 *         description: success removed
 */
app.delete("/:id", controller.deletePortfolio);

/**
 * @swagger
 * /api/portfolio/:id:
 *   put:
 *     tags: [Portfolio]
 *     summary: Update portfolio
 *     responses:
 *       200:
 *         description: success updated
 */
app.put("/:id", uploadPortfolio.array("gallery"), controller.updatePortfolio);

export default app;
