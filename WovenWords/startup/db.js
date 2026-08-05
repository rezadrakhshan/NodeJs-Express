import mongoose from "mongoose";
import debug from "debug";
import winston from "winston";

const log = debug("app:main");

export default function () {
  mongoose
    .connect(process.env.DB_ADDRESS)
    .then(() => log("connected to mongodb"))
    .catch((err) => {
      log(err);
      winston.error(err.message, err);
    });
}
