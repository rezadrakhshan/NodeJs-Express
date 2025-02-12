import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const router = e.Router();

router.get("/", controller.getTask);

export default router;
