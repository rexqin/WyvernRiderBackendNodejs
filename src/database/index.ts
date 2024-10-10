import { Sequelize } from "sequelize-typescript";
import SkillLists from "./model/SkillLists";
import Users from "./model/Users";

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME = "", MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const DBConnect = new Sequelize("WyvernRider", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port: parseInt(port),
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  storage: ":memory:",
});

DBConnect.addModels([SkillLists, Users]);

// 数据库初始化方法
async function init() {
  try {
    await DBConnect.sync({ alter: true });
  } catch (error: any) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
    }
    console.log(error);
  }
}

// 导出初始化方法和模型
export { init, DBConnect };
