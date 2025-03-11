import autoBind from "auto-bind";
import { validationResult } from "express-validator";
import Blog from "../models/blog.js";
import Service from "../models/service.js";
import Language from "../models/language.js";

export default class {
  constructor() {
    autoBind(this);
    this.Blog = Blog;
    this.Service = Service;
    this.Language = Language;
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((e) => messages.push(e.msg));
      res.status(400).json({
        message: "validation error",
        data: messages,
      });
      return false;
    }
    return true;
  }
  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
  response({ res, message, code = 200, data = {} }) {
    res.status(code).json({
      message,
      data,
    });
  }
}
