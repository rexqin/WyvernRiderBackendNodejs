import { Express } from "express";
import { Sequelize, ModelStatic } from "sequelize";
// import SkillTree, { ArrayNode } from "@/model/SkillTree";
// import { ISkillListsModel } from "@/database/model/SkillLists";

const API = (app: Express, database: Sequelize) => {
  //读取接口都使用Get，写信息接口都使用Post
  // 获取技能树信息
  app.get("/api/trick/tree", async (req, res) => {
    const model = database.models.SkillLists;

    const skillList = await database.models.SkillLists.findAll();

    // const skTree = new SkillTree(skillList);
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
