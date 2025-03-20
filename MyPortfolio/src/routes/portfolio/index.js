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

app.get("/", controller.getPortfolio);

app.delete("/:id", controller.deletePortfolio);

app.put("/:id", uploadPortfolio.array("gallery"), controller.updatePortfolio);

export default app;
