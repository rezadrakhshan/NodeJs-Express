import parentController from "../controller.js";
import _ from "lodash";

export default new (class extends parentController {
  async createService(req, res) {
    const data = _.pick(req.body, ["title", "description"]);
    const service = await new this.Service(data);
    await service.save();
    return this.response({ res, message: "Service Created", data: service });
  }
})();
