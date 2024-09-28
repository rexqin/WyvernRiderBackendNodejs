const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Users", {
    uid: {
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      comment: "用户ID",
      validate: {
        len: [0, 100],
      },
    },
    openid: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      comment: "微信用户OpenID",
      validate: {
        len: [0, 100],
      },
    },
    appid: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
      comment: "微信用户应用ID",
      validate: {
        len: [0, 100],
      },
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
      comment: "用户头像url",
      validate: {
        len: [0, 4096],
      },
      field: "avatar_url",
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      comment: "用户昵称",
      validate: {
        len: [0, 50],
      },
    },
    weight: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0,
      comment: "用户体重",
      validate: {
        min: 30,
        max: 300,
      },
    },
    height: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0,
      comment: "用户身高",
      validate: {
        min: 30,
        max: 200,
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "用户出生日期",
      validate: {},
    },
    din: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
      comment: "双板固定器推荐值",
    },
    soleLength: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0,
      comment: "鞋壳长度",
      field: "sole_length",
    },
    skillList: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[-1]",
      comment: "已认证过的技能列表",
      field: "skill_list",
    },
  });
};
