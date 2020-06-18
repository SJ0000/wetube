import express from "express";
import morgan from "morgan"; // Logger
import helmet from "helmet"; // node.js 보안
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

// app.use(myMiddleware): 이 함수 이후에 추가되는 Route 들에 myMiddleware를 추가한다
// !! 순서가 중요함

app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // /user에 접속하면 userRouter를 사용하겠다는 뜻
app.use(routes.videos, videoRouter);

//누군가 app.js를 불러올때 app 객체를 주겠다는 뜻
export default app;
