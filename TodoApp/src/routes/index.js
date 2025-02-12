import e from "express";
import authRouter from "./auth/index.js";
import taskRouter from "./task/index.js";
import { isLoggedIn } from "../middleware/user.js";

const router = e.Router();

router.use("/auth", authRouter);
router.use("/task", isLoggedIn, taskRouter);

export default router;
