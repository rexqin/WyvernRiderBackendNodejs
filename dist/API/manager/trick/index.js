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
Object.defineProperty(exports, "__esModule", { value: true });
const API = (app, database) => {
    //读取接口都使用Get，写信息接口都使用Post
    // 获取技能树信息
    app.get("/api/trick/tree", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const skillList = yield database.models.SkillLists.findAll();
        res.send({
            code: 0,
            data: skillList,
        });
    }));
    //更新技能树节点信息
    app.post("/api/trick/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const result = await Counter.count();
        // res.send({
        //   code: 0,
        //   data: result,
        // });
    }));
};
exports.default = API;
