import e from "express";
import authRouter from "./auth/index.js";
import blogRouter from "./blog/index.js";
import commentRouter from "./comment/index.js";
import { isLoggedIn } from "../middleware/user.js";

const router = e.Router();

router.use("/auth", authRouter);
router.use("/blog", isLoggedIn, blogRouter);
router.use("/comment", isLoggedIn, commentRouter);

export default router;
