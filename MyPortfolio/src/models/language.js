import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const langSchema = new mongoose.Schema({
  title: { type: String, required: true },
  nativeOrPercentage: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v) {
        return (
          v === "بومی" || (typeof v === "string" && /^\d+(\.\d+)?%$/.test(v))
        );
      },
      message: (props) =>
        `${props.value} is not a valid value for 'nativeOrPercentage'. It must be either "بومی" or a percentage.`,
    },
  },
});

langSchema.plugin(timestampsPlugin);

const Language = mongoose.model("Language", langSchema);

export default Language
