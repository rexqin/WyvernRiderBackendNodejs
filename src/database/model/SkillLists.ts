import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export default class SkillLists extends Model<SkillLists> {
  @Column({
    primaryKey: true,
    unique: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    comment: "动作技巧id",
    validate: {
      len: [0, 30],
    },
    field: "skill_id",
  })
  declare skillId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "动作中文名称",
    validate: {
      len: [0, 30],
    },
    field: "name",
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "动作英文名",
    validate: {
      len: [0, 30],
    },
    field: "name_en",
  })
  declare EnName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "动作icon",
    validate: {
      len: [0, 4096],
    },
    field: "icon",
  })
  declare icon: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: "",
    comment: "描述",
    validate: {
      len: [0, 1000],
    },
    field: "desc",
  })
  declare desc: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: "",
    comment: "适用范围",
    validate: {
      len: [0, 1000],
    },
    field: "scope",
  })
  declare scope: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "难度级别: 0-初级, 1-中级, 2-高级, 3-专家级,4-竞赛级",
    validate: {
      min: 0,
      max: 5,
    },
  })
  declare level: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "类型: 0-双板, 1单板",
    validate: {
      min: 0,
      max: 1,
    },
  })
  declare type: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
    comment: "依赖父技能ID",
    field: "parent_skill_id",
  })
  declare parentSkillId: number[];

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: "技能最大熟练度",
    field: "proficiency",
    validate: {
      min: 1,
      max: 5,
    },
  })
  declare proficiency: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "动作类别: 0-滑行 1-自由式 2-FreeRide",
    field: "category",
    validate: {
      min: 0,
      max: 2,
    },
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "控速",
    field: "terrain",
    validate: {
      min: 0,
      max: 100,
    },
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "立刃",
    field: "edge",
    validate: {
      min: 0,
      max: 100,
    },
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "旋转",
    field: "rotate",
    validate: {
      min: 0,
      max: 100,
    },
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "地形",
    field: "terrain",
    validate: {
      min: 0,
      max: 100,
    },
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "滞空",
    field: "terrain",
    validate: {
      min: 0,
      max: 100,
    },
  })
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "风险评估",
    field: "risk",
    validate: {
      min: 0,
      max: 100,
    },
  })
  declare category: number;
}
