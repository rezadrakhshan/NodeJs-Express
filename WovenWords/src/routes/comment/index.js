import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const router = e.Router();

router.post(
  "/:id",
  validator.createCommentValidator(),
  controller.validate,
  controller.createComment
);

router.delete("/:id", controller.removeComment);

export default router;
