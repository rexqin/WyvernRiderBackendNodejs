const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("WyvernRider", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

const modelDefiners = [require("./model/SkillLists"), require("./model/Users")];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// 数据库初始化方法
async function init() {
  try {
    for (const modelInstance of Object.values(sequelize.models)) {
      await modelInstance.sync({ alter: true });
    }
  } catch (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
    }
    console.log(error);
  }
}

// 导出初始化方法和模型
module.exports = {
  init,
  sequelize,
};
