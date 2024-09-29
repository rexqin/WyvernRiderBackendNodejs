import { Express } from "express";
import { Sequelize } from "sequelize";

const API = (app: Express, database: Sequelize) => {
  //读取接口都使用Get，写信息接口都使用Post
  // 获取技能树信息
  app.get("/api/trick/tree", async (req, res) => {
    const skillList = await database.models.SkillLists.findAll();
    res.send({
      code: 0,
      data: skillList,
    });
  });

  //更新技能树节点信息
  app.post("/api/trick/update", async (req, res) => {
    // const result = await Counter.count();
    // res.send({
    //   code: 0,
    //   data: result,
    // });
  });
};

export default API;
