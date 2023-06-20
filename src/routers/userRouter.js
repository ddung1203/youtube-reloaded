import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  preGitHubLogin,
  GitHubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, preGitHubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, GitHubLogin);
userRouter.get(":id(\\d+)", see);

export default userRouter;
