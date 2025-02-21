import { check } from "express-validator";

export default new (class {
  createCommentValidator() {
    return [
      check("content")
        .notEmpty()
        .withMessage("content can not be empty")
        .isLength({ min: 10, max: 300 }),
    ];
  }
})();
