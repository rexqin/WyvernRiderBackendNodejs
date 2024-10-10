import { Express } from "express";
import { Sequelize } from "sequelize-typescript";

export default (app: Express, databse: Sequelize) => {
  // 小程序调用，获取微信 Open ID
  app.get("/api/wx_openid", async (req, res) => {
    if (req.headers["x-wx-source"]) {
      res.send(req.headers["x-wx-openid"]);
    }
  });
};
