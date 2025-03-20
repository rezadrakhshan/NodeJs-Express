import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  percentage: { type: String, required: true },
});

skillSchema.plugin(timestampsPlugin);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
