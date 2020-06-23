import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import globalRouter from "./routers/globalRouter";
import helmet from "helmet"; // node.js 보안
import routes from "./routes";
import morgan from "morgan"; // Logger
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

// app.use(myMiddleware): 이 함수 이후에 추가되는 Route 들에 myMiddleware를 추가한다
// !! 순서가 중요함
app.use(helmet());

app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware); // View (.pug) 에서 Controller 의 변수를 사용할 수 있게 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // /user에 접속하면 userRouter를 사용하겠다는 뜻
app.use(routes.videos, videoRouter);

//누군가 app.js를 불러올때 app 객체를 주겠다는 뜻
export default app;
