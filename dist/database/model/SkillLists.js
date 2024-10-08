"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    sequelize.define("SkillLists", {
        skillId: {
            primaryKey: true,
            unique: true,
            type: sequelize_1.DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            comment: "动作技巧id",
            validate: {
                len: [0, 30],
            },
            field: "skill_id",
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            comment: "动作中文名",
            validate: {
                len: [0, 30],
            },
            field: "name",
        },
        EnName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            comment: "动作英文名",
            validate: {
                len: [0, 30],
            },
            field: "name_en",
        },
        icon: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            comment: "动作icon",
            validate: {
                len: [0, 4096],
            },
            field: "icon",
        },
        desc: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
            comment: "描述",
            validate: {
                len: [0, 1000],
            },
            field: "desc",
        },
        scope: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
            defaultValue: "",
            comment: "适用范围",
            validate: {
                len: [0, 1000],
            },
            field: "scope",
        },
        level: {
            type: sequelize_1.DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: "难度级别: 0-初级, 1-中级, 2-高级, 3-专家级,4-竞赛级",
            validate: {
                min: 0,
                max: 5,
            },
        },
        type: {
            type: sequelize_1.DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: "类型: 0-双板, 1单板",
            validate: {
                min: 0,
                max: 1,
            },
        },
        parentSkillId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            defaultValue: "[-1]",
            comment: "依赖父技能ID",
            field: "parent_skill_id",
        },
        proficiency: {
            type: sequelize_1.DataTypes.TINYINT,
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
            type: sequelize_1.DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: "动作类别: 0-滑行 1-自由式 2-FreeRide",
            field: "category",
            validate: {
                min: 0,
                max: 2,
            },
        },
    });
};
