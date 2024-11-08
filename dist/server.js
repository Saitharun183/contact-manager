"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const hostname = process.env.EXPRESS_HOST_NAME || "127.0.0.1";
const port = process.env.EXPRESS_PORT || "9999";
const dbUrl = process.env.MONGO_DB_CLOUD_URL;
const dbName = process.env.MONGO_DB_DATABASE;
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config({
    path: `${__dirname}/.env`
});
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome to the server!"
    });
});
// if(port && hostname){
//     app.listen(Number(port), hostname, () => {
//         if(dbUrl && dbName){
//             DBUtil.connectToDB(dbUrl,dbName).then((dbResponse) => {
//                 console.log(dbResponse)
//             }).catch((error) => {
//                 console.error(error);
//             })
//         }
//     })
// }
