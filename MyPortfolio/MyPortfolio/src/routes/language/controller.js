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
  async updateLang(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Invalid ID", code: 400 });
    }
    const data = _.pick(req.body, ["title", "nativeOrPercentage"]);
    if (data.nativeOrPercentage) {
      if (
        data.nativeOrPercentage === "بومی" ||
        (typeof data.nativeOrPercentage === "string" &&
          /^\d+(\.\d+)?%$/.test(data.nativeOrPercentage))
      ) {
        const lang = await this.Language.findByIdAndUpdate(
          req.params.id,
          data,
          {
            new: true,
          }
        );
        if (!lang) {
          return this.response({
            res,
            message: "Language does not exists",
            code: 404,
          });
        }
        return this.response({ res, message: "Language updated", data: lang });
      }
    }
    return this.response({
      res,
      message: `${data.nativeOrPercentage} is not a valid value for 'nativeOrPercentage'. It must be either "بومی" or a percentage.`,
      code: 400,
    });
  }
  async getAllLang(req, res) {
    const data = await this.Language.find({});
    return this.response({ res, message: "All language is here", data: data });
  }
})();
