import express from "express";
import logging from "./startup/logging.js";
import db from "./startup/db.js";
import config from "./startup/config.js";
import router from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;


logging();
db();
config(app, express);

app.use("/api", router);

app.listen(port, () => console.log(`app running on port ${port}`));
