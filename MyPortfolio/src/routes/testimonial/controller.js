import parentcontroller from "../controller.js";
import path from "path";
import { fileURLToPath } from "url";
import _ from "lodash";
import mongoose from "mongoose";
import fs from "fs"

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
  async getAllTestimonial(req, res) {
    const data = await this.Testimonial.find({});
    return this.response({
      res,
      message: "All testimonial is here",
      data: data,
    });
  }
  async removeTestimonial(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "Inavlid ID", code: 400 });
    }
    const result = await this.Testimonial.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!result) {
      return this.response({
        res,
        message: "Testimonial does not exists",
        code: 404,
      });
    }
    const oldProfilePath = path.join(
      __dirname,
      "../../../public/testimonial",
      result.profile.split("/testimonial/")[1]
    );
    fs.unlink(oldProfilePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error deleting old image:", err);
      }
    });
    return this.response({ res, message: "Testimonial was remove" });
  }
})();
