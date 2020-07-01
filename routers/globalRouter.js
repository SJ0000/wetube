import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogIn,
  getMe,
  postFacebookLogin,
  facebookLogin,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

export const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogIn,
);

globalRouter.get(routes.me, onlyPrivate, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook"),
  postFacebookLogin,
);

export default globalRouter;
