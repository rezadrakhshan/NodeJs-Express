import User from "../models/user.js";
import jwt from "jsonwebtoken";
import c from "config";

export async function isLoggedIn(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("access denied");
  }
  try {
    const decoded = jwt.verify(token, c.get("jwt_secret"));
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
}
