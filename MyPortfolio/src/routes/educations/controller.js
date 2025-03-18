import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parentController {
  async createEducation(req, res) {
    const data = _.pick(req.body, [
      "title",
      "description",
      "timeLine",
      "isWork",
    ]);
    data.certificate = req.file ? `/education/${req.file.filename}` : null;
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
    const oldCertificatePath = path.join(
      __dirname,
      "../../../public/education",
      result.certificate.split("/education/")[1]
    );
    fs.unlink(oldCertificatePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Error deleting old certificate:", err);
      }
    });
    return this.response({ res, message: "Education removed" });
  }
  async getAllEducation(req, res) {
    const result = await this.Education.find({ isWork: false });
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
    const data = _.pick(req.body, [
      "title",
      "description",
      "timeLine",
      "isWork",
    ]);
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
    if (req.file) {
      if (result.certificate) {
        const oldCertificatePath = path.join(
          __dirname,
          "../../../public/education",
          result.certificate.split("/education/")[1]
        );
        fs.unlink(oldCertificatePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting old certificate:", err);
          }
        });
      }
      result.certificate = `/education/${req.file.filename}`;
      await result.save();
    }
    return this.response({ res, message: "Education updated", data: result });
  }
  async getAllWork(req, res) {
    const result = await this.Education.find({ isWork: true });
    return this.response({ res, message: "All work is here", data: result });
  }
})();
