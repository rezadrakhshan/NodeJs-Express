import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";

export default new (class extends parentController {
  async createLang(req, res) {
    try {
      const data = _.pick(req.body, ["title", "nativeOrPercentage"]);
      const result = await new this.Language(data);
      await result.save();
      return this.response({ res, message: "Language created", data: result });
    } catch (error) {
      return this.response({ res, data: error.message, code: 400 });
    }
  }
  async removeLang(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const result = await this.Language.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Language does not exists",
        code: 404,
      });
    }
    return this.response({ res, message: "Language removed" });
  }
})();
