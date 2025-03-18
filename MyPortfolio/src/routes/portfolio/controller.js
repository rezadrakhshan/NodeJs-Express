import parentController from "../controller.js";
import _ from "lodash";

export default new (class extends parentController {
  async createPortfolio(req, res) {
    const data = _.pick(req.body, ["title", "category", "subject", "detail"]);
    const files = req.files;
    const gallery = files.map((file) => file.filename);
    const portfolio = await new this.Portfolio({ ...data, gallery }).save();
    return this.response({
      res,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  }
})();
