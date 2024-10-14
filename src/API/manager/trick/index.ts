import { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import SkillLists from "../../../database/model/SkillLists";
import SkillTree, { ArrayNode } from "../../../model/skillTree";
import { Model } from "sequelize";
// import { ISkillListsModel } from "@/database/model/SkillLists";

const API = (app: Express, database: Sequelize) => {
  //读取接口都使用Get，写信息接口都使用Post
  // 获取技能树信息
  app.get("/api/trick/tree", async (req, res) => {
    const skillList: Model<SkillLists>[] =
      await database.models.SkillLists.findAll<Model<SkillLists>>();

    const nodes: ArrayNode[] = [];
    skillList.map((skill: Model<SkillLists>) => {
      nodes.push(skill.dataValues);
    });

    // const skTree = new SkillTree(nodes);

    // const data = skTree.arrayToTree();

    res.send({
      code: 0,
      data: nodes,
    });
  });

  //更新技能树节点信息
  app.post("/api/trick/update", async (req, res) => {
    if (req.body.data) {
      const data: ArrayNode[] = JSON.parse(req.body.data);
      if (data) {
        try {
          data.map(async (item) => {
            await database.models.SkillLists.update(item, {
              where: { skillId: item.skillId },
            });
          });

          res.send({
            code: 0,
            data: null,
            msg: "success",
          });
        } catch (error) {
          res.send({
            code: -3,
            data: null,
            msg: "updating record is failed",
          });
        }
      } else {
        res.send({
          code: -2,
          data: null,
          msg: "the format of data is illegal",
        });
      }
    } else {
      res.send({
        code: -1,
        data: null,
        msg: "the field of data is not allowed empty",
      });
    }
    // const result = await Counter.count();
  });
};

export default API;
