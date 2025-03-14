import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

export default function (app, e) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
  app.use(helmet());
  app.use(e.urlencoded({ extended: true }));
  app.use(e.json());
  app.use(e.static("public"));
}
