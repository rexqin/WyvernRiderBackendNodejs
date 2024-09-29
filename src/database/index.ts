import { Sequelize, DataTypes } from "sequelize";
import SkillLists from "./model/SkillLists";
import Users from "./model/Users";

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME = "", MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const DBConnect = new Sequelize("WyvernRider", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port: parseInt(port),
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

const modelDefiners = [SkillLists, Users];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(DBConnect);
}

// 数据库初始化方法
async function init() {
  try {
    for (const modelInstance of Object.values(DBConnect.models)) {
      await modelInstance.sync({ alter: true });
    }
  } catch (error: any) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
    }
    console.log(error);
  }
}

// 导出初始化方法和模型
module.exports = {
  init,
  DBConnect,
};
