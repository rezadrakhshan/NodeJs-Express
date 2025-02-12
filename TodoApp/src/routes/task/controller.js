import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";

export default new (class extends parentController {
  async createTask(req, res) {
    const newTask = new this.Task({
      title: req.body.title,
      description: req.body.description,
      user: req.user,
    });
    await newTask.save();
    return this.response({ res, message: "task created", data: newTask });
  }
  async getUserTasks(req, res) {
    const tasks = await this.Task.find({ user: req.user });
    return this.response({ res, message: "all tasks is here", data: tasks });
  }
  async updateTask(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "invalid id", code: 400 });
    }
    await this.Task.findByIdAndUpdate(req.params.id, {
      $set: {
        isCompleted: req.body.status,
      },
    });
    return this.response({ res, message: "Task Updated" });
  }
  async removeTask(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "invalid id", code: 400 });
    }
    await this.Task.findByIdAndDelete(req.params.id);
    return this.response({ res, message: "task removed" });
  }
})();
