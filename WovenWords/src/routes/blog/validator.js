import { check } from "express-validator";

export default new (class {
  createBlogValidator() {
    return [
      check("title")
        .notEmpty()
        .withMessage("title can not be empty")
        .isLength({ min: 10, max: 100 }),
      check("content")
        .notEmpty()
        .withMessage("content can not be empty")
        .isLength({ min: 10 }),
      check("image").optional().isURL().withMessage("image must be valid url"),
    ];
  }
  updateBlogValidator() {
    return [
      check("title").optional().isLength({ min: 10, max: 100 }),
      check("content").optional().isLength({ min: 10 }),
      check("image")
        .optional()
        .isURL()
        .withMessage("image must be a valid URL"),
    ];
  }
})();
