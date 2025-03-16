import { check } from "express-validator";

export default new (class {
  createBlogValidator() {
    return [
      check("title")
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage("title can not be empty"),
      check("content")
        .notEmpty().withMessage("content can not be empty")
        .isLength({ min: 50 })
        .withMessage("content must be more than 50 character"),
      check("image").optional().isURL().withMessage("image must be valid url"),
    ];
  }
  updateBlogValidator() {
    return [
      check("title").optional().isLength({ max: 100 }),
      check("content").optional().isLength({ min: 50 }),
      check("image")
        .optional()
        .isURL()
        .withMessage("image must be a valid URL"),
    ];
  }
})();
