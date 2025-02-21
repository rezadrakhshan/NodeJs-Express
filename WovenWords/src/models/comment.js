import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const commentSchema = new mongoose.Schema({
  postID: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
});

commentSchema.plugin(timestampsPlugin);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
