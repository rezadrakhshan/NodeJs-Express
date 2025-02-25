import User from "../models/user.js";
import jwt from "jsonwebtoken";
import c from "config";
import _ from "lodash";

export async function isLoggedIn(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("access denied");
  }
  try {
    const decoded = jwt.verify(token, c.get("jwt_secret"));
    const user = await User.findById(decoded._id);
    req.user = _.pick(user, ["_id", "email", "name", "isAdmin"]);
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
}

export async function isUserAdmin(req, res, next) {
  console.log(req.user);
  if (req.user.isAdmin === true) {
    next();
  } else {
    res.status(401).send("access denied");
  }
}
