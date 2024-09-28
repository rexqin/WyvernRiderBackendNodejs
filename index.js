const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const trickAPI = require("./API/manager/trick");
const userInfoAPI = require("./API/user/info");

const { init: initDB, DBConnect } = require("./database");

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
