import mongoose from "mongoose";
import timestampsPlugin from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(timestampsPlugin);

const User = mongoose.model("User", userSchema);

export default User
