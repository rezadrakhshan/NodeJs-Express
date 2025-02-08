import parentController from "../controller.js";

export default new (class extends parentController {
  async register(req, res) {
    this.response({ res, message: "register" });
  }
  async login(req, res) {
    this.response({ res, message: "login" });
  }
})();
