import express from "express";
import {
  edit,
  logout,
  see,
  preGitHubLogin,
  GitHubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", preGitHubLogin);
userRouter.get("/github/finish", GitHubLogin);
userRouter.get(":id(\\d+)", see);

export default userRouter;
