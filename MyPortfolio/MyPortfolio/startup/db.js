import mongoose from "mongoose";
import c from "config";
import debug from "debug";
import winston from "winston";

const log = debug("app:main");

export default function () {
  mongoose
    .connect(c.get("db.address"))
    .then(() => log("app connected to mongodb"))
    .catch((err) => {
      log(err);
      winston.error(err.message, err);
    });
}
