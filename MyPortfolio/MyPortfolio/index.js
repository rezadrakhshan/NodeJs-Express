import e from "express";
import debug from "debug";
import db from "./startup/db.js";
import logging from "./startup/logging.js";
import config from "./startup/config.js";
import router from "./src/routes/index.js";

const port = process.env.PORT || 3000;
const log = debug("app:main");
const app = e();

config(app, e);
db();
logging();

app.use("/api", router);

app.listen(port, () => log(`app ruuning on port ${port}`));
export default [log];
