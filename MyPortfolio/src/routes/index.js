import e from "express"
import blogRouter from "./blog/index.js"

const router = e.Router()

router.use("/blog",blogRouter)

export default router
