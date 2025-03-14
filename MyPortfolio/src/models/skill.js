import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  percentage: { type: String, required: true },
  validate: {
    validator: function (v) {
      return typeof v === "string" && /^\d+(\.\d+)?%$/.test(v);
    },
    message: (props) =>
      `${props.value} is not a valid value for 'nativeOrPercentage'. It must be either a percentage.`,
  },
});

skillSchema.plugin(timestampsPlugin);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill
