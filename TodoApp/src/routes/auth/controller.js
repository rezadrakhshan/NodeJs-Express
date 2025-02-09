import parentController from "../controller.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import c from "config";

export default new (class extends parentController {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        message: "user already registered",
        code: 400,
      });
    }
    user = new this.User(_.pick(req.body, ["email", "name", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return this.response({
      res,
      message: "account created",
      data: _.pick(user, ["_id", "email", "name"]),
    });
  }
  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        message: "invalid email or password",
        code: 400,
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        message: "invalid email or password",
        code: 400,
      });
    }
    const token = jwt.sign({ _id: user.id }, c.get("jwt_secret"));
    return this.response({
      res,
      message: "Successfully logged in.",
      data: token,
    });
  }
})();
