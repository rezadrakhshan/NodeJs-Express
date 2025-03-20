import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const testimonialSchema = new mongoose.Schema({
  profile: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  comment: { type: String, reqiored: true },
});

testimonialSchema.plugin(timestampsPlugin);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
