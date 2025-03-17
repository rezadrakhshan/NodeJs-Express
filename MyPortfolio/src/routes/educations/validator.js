import { check } from "express-validator";

export default new (class {
  createEducationValidator() {
    return [
      check("title")
        .notEmpty()
        .withMessage("title can not be empty")
        .isLength({ max: 50 })
        .withMessage("title must be less than 50 characters."),
      check("description")
        .notEmpty()
        .withMessage("description can not be empty")
        .isLength({ min: 50 })
        .withMessage("description must be more than 50 characters."),
      check("timeLine")
        .notEmpty()
        .withMessage("timeLine can not be empty")
        .isLength({ min: 11, max: 11 })
        .withMessage("timeLine must be 11 characters."),
    ];
  }
  updateEducationValidator() {
    return [
      check("title")
        .optional()
        .isLength({ max: 50 })
        .withMessage("title must be less than 50 characters."),
      check("description")
        .optional()
        .isLength({ min: 50 })
        .withMessage("description must be more than 50 characters."),
      check("timeLine")
        .optional()
        .isLength({ min: 11, max: 11 })
        .withMessage("timeLine must be 11 characters."),
    ];
  }
})();
