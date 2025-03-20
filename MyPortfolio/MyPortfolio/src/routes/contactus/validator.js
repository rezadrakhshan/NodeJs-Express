import { check } from "express-validator";

export default new (class {
  contactValidator() {
    return [
      check("name").notEmpty().withMessage("name can not be empty"),
      check("subject").notEmpty().withMessage("subject can not be empty"),
      check("message").notEmpty().withMessage("subject can not be empty"),
      check("email").notEmpty().isEmail().withMessage("Invalid Email"),
    ];
  }
})();
