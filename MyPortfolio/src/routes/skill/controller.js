import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";

export default new (class extends parentController {
  async getAllSkill(req, res) {
    const skills = await this.Skill.find({});
    return this.response({ res, message: "All skill is here", data: skills });
  }
  async createSkill(req, res) {
    const data = _.pick(req.body, ["title", "percentage"]);
    const result = await new this.Skill(data);
    await result.save();
    return this.response({ res, messgae: "Skill created", data: result });
  }
  async removeskill(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const result = await this.Skill.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Skill does not exists",
        code: 404,
      });
    }
    return this.response({ res, message: "Skill removed" });
  }
  async updateSkill(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const data = _.pick(req.body, ["title", "percentage"]);
    const result = await this.Skill.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Skill does not exists",
        code: 404,
      });
    }
    return this.response({
      res,
      message: "Skill successfully updated",
      data: result,
    });
  }
})();
