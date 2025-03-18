import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeLine: { type: String, required: true },
  certificate: { type: String },
  isWork: { type: String, default: false },
});

educationSchema.plugin(timestampsPlugin);

const Education = mongoose.model("Education", educationSchema);

export default Education;
