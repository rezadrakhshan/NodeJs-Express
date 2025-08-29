import e from "express";
import blogRouter from "./blog/index.js";
import serviceRouter from "./service/index.js";
import contactRouter from "./contactus/index.js";
import langRouter from "./language/index.js";
import skillRouter from "./skill/index.js";
import testimonialRouter from "./testimonial/index.js";
import educationRouter from "./educations/index.js";
import portfolioRouter from "./portfolio/index.js";

const router = e.Router();
 
router.use("/blog", blogRouter);
router.use("/service", serviceRouter);
router.use("/contact", contactRouter);
router.use("/language", langRouter);
router.use("/skill", skillRouter);
router.use("/testimonial", testimonialRouter);
router.use("/education", educationRouter);
router.use("/portfolio", portfolioRouter);
export default router;
