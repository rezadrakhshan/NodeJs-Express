import parentcontroller from "../controller.js";
import path from "path";
import { fileURLToPath } from "url";
import _ from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parentcontroller {
  async createTestimonial(req, res) {
    const data = _.pick(req.body, ["name", "position", "comment"]);
    data.profile = req.file ? `/testimonial/${req.file.filename}` : null;

    const result = await new this.Testimonial(data);

    await result.save();

    return this.response({ res, message: "Testimonial created", data: result });
  }
})();
