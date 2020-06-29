import routes from "./routes";
import multer from "multer";
import { EvalSourceMapDevToolPlugin } from "webpack";
// View (.pug)에서 Controller의 변수를 사용할 수 있게 함
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null; // passport가 user object를 req에 넣어줌
  console.log(req.user);
  next();
};

// login된 사용자를 특정 route에 접근할 수 없게 함
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
