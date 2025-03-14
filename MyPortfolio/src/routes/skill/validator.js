import { check } from "express-validator";

export default new (class {
  createSkillValidator() {
    return [
      check("title").notEmpty().withMessage("title can not be empty"),
      check("percentage").notEmpty().withMessage("percentage can not be empty"),
    ];
  }
})();
