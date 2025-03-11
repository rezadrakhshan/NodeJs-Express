import parentController from "../controller.js";
import _ from "lodash";

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
})();
