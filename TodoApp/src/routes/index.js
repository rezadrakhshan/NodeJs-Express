import e from "express";
import authRouter from "./auth/index.js";

const router = e.Router();

router.use("/auth", authRouter);

export default router;
