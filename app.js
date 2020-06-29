import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import express from "express";
import globalRouter from "./routers/globalRouter";
import helmet from "helmet"; // node.js 보안
import routes from "./routes";
import morgan from "morgan"; // Logger
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo"; // cookie를 mongodb에 저장
import mongoose from "mongoose";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// app.use(myMiddleware): 이 함수 이후에 추가되는 Route 들에 myMiddleware를 추가한다
// !! 순서가 중요함
app.use(helmet());

app.set("view engine", "pug");

// /uploads 나 /static 에 접근하려고 하면 해당 폴더로 보내줌
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // View (.pug) 에서 Controller 의 변수를 사용할 수 있게 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // /user에 접속하면 userRouter를 사용하겠다는 뜻
app.use(routes.videos, videoRouter);

//누군가 app.js를 불러올때 app 객체를 주겠다는 뜻
export default app;
