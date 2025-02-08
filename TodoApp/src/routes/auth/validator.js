import { check } from "express-validator";

export default new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("invalid email"),
      check("name").notEmpty().withMessage("name cant be empty"),
      check("password").notEmpty().withMessage("password cant be empty"),
    ];
  }
  loginValidator() {
    return [
      check("email").isEmail().withMessage("invalid email"),
      check("password").notEmpty().withMessage("password cant be empty"),
    ];
  }
})();
