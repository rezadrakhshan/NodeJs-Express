import parrentController from "../controller.js";
import _ from "lodash";
import path from "path";
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new (class extends parrentController {
  async createBlog(req, res) {
    const data = _.pick(req.body, ["title", "content", "is_published"]);
    data.image = req.file ? `/blog/${req.file.filename}` : null;
    const newBlog = new this.Blog(data);

    await newBlog.save();

    this.response({
      res,
      message: "Blog Created",
      data: newBlog,
    });
  }
})();
