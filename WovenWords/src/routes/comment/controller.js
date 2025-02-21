import parentController from "../controller.js";
import _ from "lodash";
import mongoose from "mongoose";

export default new (class extends parentController {
  async createComment(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return this.response({ res, message: "invalid ID", code: 400 });
    }
    const blog = await this.Blog.findById(req.params.id);
    if (!blog) {
      return this.response({ res, message: "Blog not found", code: 404 });
    }
    const comment = new this.Comment({
      postID: req.params.id,
      userID: req.user.id,
      content: req.body.content,
    });
    await comment.save();
    blog.comments.push(comment._id);
    await blog.save();
    return this.response({ res, message: "comment created", data: comment });
  }
})();
