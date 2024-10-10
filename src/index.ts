import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import trickAPI from "@/API/manager/trick";
import userInfoAPI from "@/API/user/info";
import { init as initDB, DBConnect } from "@/database";

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

const port = process.env.PORT || 80;

trickAPI(app, DBConnect);

userInfoAPI(app, DBConnect);

async function bootstrap() {
  await initDB();

  // 首页
  app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
