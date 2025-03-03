import e from "express";
import controller from "./controller.js";
import validator from "./validator.js";

const app = e.Router();

app.get("/", controller.createBlog);

export default app;
