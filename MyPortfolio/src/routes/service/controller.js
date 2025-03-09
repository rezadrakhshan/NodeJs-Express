import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";

export default new (class extends parentController {
  async createService(req, res) {
    const data = _.pick(req.body, ["title", "description"]);
    const service = await new this.Service(data);
    await service.save();
    return this.response({ res, message: "Service Created", data: service });
  }
  async removeService(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const result = await this.Service.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Service does not exists",
        code: 404,
      });
    }
    return this.response({ res, message: "Service removed" });
  }
  async updateService(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      this.response({ res, message: "Invalid ID", code: 400 });
    }
    const data = _.pick(req.body, ["title", "description"]);
    const service = await this.Service.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!service) {
      return this.response({
        res,
        message: "Service does not exists",
        code: 404,
      });
    }
    return this.response({
      res,
      message: "Service updated successfully",
      data: service,
    });
  }
})();
