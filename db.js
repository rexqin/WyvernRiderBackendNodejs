const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("WyvernRider", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const SkillList = sequelize.define("SkillList", {
  skill_id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    comment: "动作技巧id",
    validate: {
      len: [0, 30],
    },
    field: "skillId",
  },
  name: {
    type: DataTypes.CHAR,
    allowNull: false,
    defaultValue: "",
    comment: "动作中文名",
    validate: {
      len: [0, 30],
    },
    field: "name",
  },
  EnName: {
    type: DataTypes.CHAR,
    allowNull: false,
    defaultValue: "",
    comment: "动作英文名",
    validate: {
      len: [0, 30],
    },
    field: "name_en",
  },
  icon: {
    type: DataTypes.CHAR,
    allowNull: false,
    defaultValue: "",
    comment: "动作icon",
    validate: {
      len: [0, 4096],
    },
    field: "icon",
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
    comment: "描述",
    validate: {
      len: [0, 1000],
    },
    field: "desc",
  },
  scope: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "",
    comment: "适用范围",
    validate: {
      len: [0, 1000],
    },
    field: "scope",
  },
  level: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "难度级别: 0-初级, 1-中级, 2-高级, 3-专家级,4-竞赛级",
    validate: {
      min: 0,
      max: 4,
    },
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "类型: 0-双板, 1单板",
    validate: {
      min: 0,
      max: 1,
    },
  },
  parentSkillId: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[-1]",
    comment: "依赖父技能ID",
    field: "parent_skill_id",
  },
  proficiency: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: "技能最大熟练度",
    field: "proficiency",
    validate: {
      min: 1,
      max: 5,
    },
  },
  category: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "动作类别: 0-滑行 1-自由式 2-FreeRide",
    field: "proficiency",
    validate: {
      min: 0,
      max: 2,
    },
  },
});

// 数据库初始化方法
async function init() {
  await SkillList.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
};
