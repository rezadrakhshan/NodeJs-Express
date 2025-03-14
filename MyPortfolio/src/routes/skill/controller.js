import parentController from "../controller.js";
import _ from "lodash";

export default new (class extends parentController {
  async createSkill(req, res) {
    try {
      const data = _.pick(req.body, ["title", "percentage"]);
      const result = await new this.Skill(data);
      await result.save();
      return this.response({ res, messgae: "Skill created", data: result });
    } catch (error) {
      return this.response({ res, message: error.message, code: 400 });
    }
  }
})();
