import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";

@Table
export default class Users extends Model<Users> {
  @Column({
    primaryKey: true,
    unique: true,
    type: DataType.STRING,
    allowNull: false,
    autoIncrement: false,
    comment: "用户ID",
    validate: {
      len: [0, 100],
    },
  })
  declare uid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "微信用户OpenID",
    validate: {
      len: [0, 100],
    },
  })
  declare openid: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "微信用户应用ID",
    validate: {
      len: [0, 100],
    },
  })
  declare appid: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
    comment: "用户头像url",
    validate: {
      len: [0, 4096],
    },
    field: "avatar_url",
  })
  declare avatarUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "用户昵称",
    validate: {
      len: [0, 50],
    },
  })
  declare nickname: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
    defaultValue: 0,
    comment: "用户体重",
    validate: {
      min: 30,
      max: 300,
    },
  })
  declare weight: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
    defaultValue: 0,
    comment: "用户身高",
    validate: {
      min: 30,
      max: 200,
    },
  })
  declare height: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: "用户出生日期",
    validate: {},
  })
  declare birthday: Date;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
    comment: "双板固定器推荐值",
  })
  declare din: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: true,
    defaultValue: 0,
    comment: "鞋壳长度",
    field: "sole_length",
  })
  declare soleLength: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: "[-1]",
    comment: "已认证过的技能列表",
    field: "skill_list",
  })
  declare skillList: string;

  @CreatedAt
  declare creationDate: Date;

  @UpdatedAt
  declare updatedOn: Date;
}
