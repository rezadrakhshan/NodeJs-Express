import { check } from "express-validator";

export default new (class {
  createBlogValidator() {
    return [
      check("title")
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage("title can not be empty"),
      check("content")
        .notEmpty()
        .isLength({ min: 50 })
        .withMessage("content can not be empty"),
      check("image").optional().isURL().withMessage("image must be valid url"),
    ];
  }
})();
