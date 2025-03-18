import { check } from "express-validator";

export default new (class {
  createPortfolioValidator() {
    return [
      check("title").notEmpty().withMessage("Title is required"),
      check("category").notEmpty().withMessage("Category is required"),
      check("subject").notEmpty().withMessage("Subject is required"),
      check("detail").notEmpty().withMessage("Detail is required"),
    ];
  }
})();
