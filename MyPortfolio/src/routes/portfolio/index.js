import e from "express";
import { uploadPortfolio } from "../../middleware/upload.js";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.post(
  "/",
  uploadPortfolio.array("gallery"),
  validator.createPortfolioValidator(),
  controller.validate,
  controller.createPortfolio
);

export default app;
