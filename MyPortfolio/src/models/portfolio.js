import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  detail: { type: String, required: true },
  gallery: [{ type: String, required: true }],
});

portfolioSchema.plugin(timestampsPlugin);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio; 
