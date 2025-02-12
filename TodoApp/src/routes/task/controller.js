import parentController from "../controller.js";
import _ from "lodash";

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
})();
