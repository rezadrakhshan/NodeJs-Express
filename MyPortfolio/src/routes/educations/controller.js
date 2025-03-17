import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";

export default new (class extends parentController {
  async createEducation(req, res) {
    const data = _.pick(req.body, ["title", "description", "timeLine"]);
    const result = await new this.Education(data);
    await result.save();
    return this.response({
      res,
      message: "Education created succesfully",
      data: result,
    });
  }
  async removeEducation(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const result = await this.Education.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Education does not exists",
        code: 404,
      });
    }
    return this.response({ res, message: "Education removed" });
  }
  async getAllEducation(req, res) {
    const result = await this.Education.find({});
    return this.response({
      res,
      message: "All education is here",
      data: result,
    });
  }
  async updateEducation(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const data = _.pick(req.body, ["title", "description", "timeLine"]);
    const result = await this.Education.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Education does not exists",
        code: 404,
      });
    }
    return this.response({ res, message: "Education updated", data: result });
  }
})();
