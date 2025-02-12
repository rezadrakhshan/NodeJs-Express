import { check } from "express-validator";

export default new (class {
  createTaskValidator() {
    return [
      check("title").notEmpty().withMessage("title can not be empty"),
      check("description")
        .notEmpty()
        .withMessage("description can not be empty"),
    ];
  }
  updateTask() {
    return [
      check("status")
        .notEmpty()
        .isBoolean()
        .withMessage("status can not be empty or status must be boolean"),
    ];
  }
})();
