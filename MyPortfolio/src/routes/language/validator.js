import { check } from "express-validator";

export default new (class {
  createLangValidator() {
    return [
      check("title").notEmpty().withMessage("title can not be empty"),
      check("nativeOrPercentage").notEmpty().withMessage("nativeOrPercentage can not be empty"),
    ];
  }
})();
