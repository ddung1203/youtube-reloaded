import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(logger);
app.use(express.urlencoded({ extended: true })); //form to javascript: req.body
app.use(express.json()); //data FE to BE
app.use(
  session({
    // Session hijack 방지
    secret: process.env.COOKIE_SECRET,
    // 익명 사용자 저장
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 },
    store: MongoStore.create({
      mongoUrl: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}?authSource=admin`,
    }),
  })
);
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
