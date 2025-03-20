import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

serviceSchema.plugin(timestampsPlugin)

const Service = mongoose.model("Service",serviceSchema)

export default Service
