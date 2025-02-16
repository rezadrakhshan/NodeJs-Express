import parentController from "../controller.js";
import _ from "lodash";
import slugify from "slugify";

export default new (class extends parentController {
  async createBlog(req, res) {
      const { title, content } = req.body;
      const userId = req.user.id;
      const slug = slugify(title, { lower: true });
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; 

      const newBlog = new this.Blog({
        userId: userId,
        title: title,
        content: content,
        image: imagePath,
        slug: slug,
      });

      await newBlog.save();

      this.response({
        res,
        message: "Blog Created",
        data: newBlog,
      });
  }
})();
