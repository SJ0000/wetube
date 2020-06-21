import routes from "./routes";
// View (.pug)에서 Controller의 변수를 사용할 수 있게 함
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
