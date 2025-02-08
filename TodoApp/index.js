import e from "express";
import logging from "./startup/logging.js";
import db from "./startup/db.js";
import config from "./startup/config.js";

const app = e();
const port = process.env.PORT || 3000;

logging();
db();
config(app, e);

app.listen(port, () => console.log(`app running on port ${port}`));
