import e from "express";
import blogRouter from "./blog/index.js";
import serviceRouter from "./service/index.js";

const router = e.Router();

router.use("/blog", blogRouter);
router.use("/service", serviceRouter);

export default router;
