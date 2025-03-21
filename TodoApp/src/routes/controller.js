import autoBind from "auto-bind";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import Task from "../models/task.js";

export default class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Task = Task
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const message = [];
      errors.forEach((e) => message.push(e.msg));
      res.status(400).json({
        message: "validation error",
        data: message,
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
      message: message,
      data: data,
    });
  }
}
