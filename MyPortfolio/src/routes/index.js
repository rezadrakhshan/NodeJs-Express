import e from "express";
import blogRouter from "./blog/index.js";
import serviceRouter from "./service/index.js";
import contactRouter from "./contactus/index.js"


const router = e.Router();

router.use("/blog", blogRouter);
router.use("/service", serviceRouter);
router.use("/contact", contactRouter);

export default router;
