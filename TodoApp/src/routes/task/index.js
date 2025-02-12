import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const router = e.Router();

router.post(
  "/",
  validator.createTaskValidator(),
  controller.validate,
  controller.createTask
);
router.get("/", controller.getUserTasks);

export default router;
