"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnect = void 0;
exports.init = init;
const sequelize_1 = require("sequelize");
const SkillLists_1 = __importDefault(require("./model/SkillLists"));
const Users_1 = __importDefault(require("./model/Users"));
// 从环境变量中读取数据库配置
const { MYSQL_USERNAME = "", MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const [host, port] = MYSQL_ADDRESS.split(":");
const DBConnect = new sequelize_1.Sequelize("WyvernRider", MYSQL_USERNAME, MYSQL_PASSWORD, {
    host,
    port: parseInt(port),
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
exports.DBConnect = DBConnect;
const modelDefiners = [SkillLists_1.default, Users_1.default];
// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(DBConnect);
}
// 数据库初始化方法
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DBConnect.sync({ alter: true });
        }
        catch (error) {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
            }
            console.log(error);
        }
    });
}
