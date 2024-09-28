const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const trickAPI = require("./API/manager/trick");
const userInfoAPI = require("./API/user/info");

const { init: initDB, sequelize } = require("./database");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

trickAPI(app);

userInfoAPI(app);

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
