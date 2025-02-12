import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

taskSchema.plugin(timestampsPlugin);

const Task = mongoose.model("Task", taskSchema);

export default Task;
