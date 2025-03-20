import parentController from "../controller.js";
import _ from "lodash";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parentController {
  async createPortfolio(req, res) {
    const data = _.pick(req.body, ["title", "category", "subject", "detail"]);
    const files = req.files;
    const gallery = files.map((file) => `/portfolio/${file.filename}`);
    const portfolio = await new this.Portfolio({ ...data, gallery }).save();
    return this.response({
      res,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  }
  async getPortfolio(req, res) {
    const portfolio = await this.Portfolio.find();
    return this.response({
      res,
      message: "Portfolio fetched successfully",
      data: portfolio,
    });
  }
  async deletePortfolio(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({
        res,
        message: "Invalid ID",
        code: 400,
      });
    }
    const portfolio = await this.Portfolio.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!portfolio) {
      return this.response({
        res,
        message: "Portfolio not found",
        code: 404,
      });
    }
    portfolio.gallery.forEach((imagePath) => {
      const filename = path.basename(imagePath);
      const oldGalleryPath = path.join(
        __dirname,
        "../../../public/portfolio",
        filename
      );
      fs.unlink(oldGalleryPath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image:", err);
        }
      });
    });

    return this.response({
      res,
      message: "Portfolio deleted successfully",
    });
  }
  async updatePortfolio(req, res) {
    const data = _.pick(req.body, ["title", "category", "subject", "detail"]);
    const files = req.files;
    const gallery = files.map((file) => `/portfolio/${file.filename}`);
    const portfolio = await this.Portfolio.findById(req.params.id);
    if (!portfolio) {
      return this.response({
        res,
        message: "Portfolio not found",
        code: 404,
      });
    }
    portfolio.gallery.forEach((imagePath) => {
      const filename = path.basename(imagePath);
      const oldGalleryPath = path.join(
        __dirname,
        "../../../public/portfolio",
        filename
      );
      fs.unlink(oldGalleryPath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image:", err);
        }
      });
    });
    const result = await this.Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...data, gallery },
      { new: true }
    );
    return this.response({
      res,
      message: "Portfolio updated successfully",
      data: result,
    });
  }
})();
