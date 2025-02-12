import parentController from "../controller.js";

export default new (class extends parentController {
  async getTask(req, res) {
    this.response({ res, message: "tasks" });
  }
})();
