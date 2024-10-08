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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const trick_1 = __importDefault(require("./API/manager/trick"));
const info_1 = __importDefault(require("./API/user/info"));
const database_1 = require("./database");
const logger = (0, morgan_1.default)("tiny");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(logger);
const port = process.env.PORT || 80;
(0, trick_1.default)(app, database_1.DBConnect);
(0, info_1.default)(app, database_1.DBConnect);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.init)();
        // 首页
        app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.sendFile(path_1.default.join(__dirname, "index.html"));
        }));
        app.listen(port, () => {
            console.log("启动成功", port);
        });
    });
}
bootstrap();
