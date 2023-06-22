import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); //form to javascript: req.body
app.use(
  session({
    // Session hijack 방지
    secret: process.env.COOKIE_SECRET,
    // 익명 사용자 저장
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 },
    store: MongoStore.create({
      mongoUrl: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/youtube?authSource=admin`,
    }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
