import { check } from "express-validator";

export default new (class {
  createTestimonialValidator() {
    return [
      check("name").notEmpty().withMessage("name can not be empty"),
      check("position").notEmpty().withMessage("position can not be empty"),
      check("comment").notEmpty().withMessage("comment can not be empty"),
      check("image").optional().isURL().withMessage("image must be valid url"),
    ];
  }
})();
