import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import {DBUtil} from "./Util/DBUtil";
import contactsRouter from "./Router/contactsRouter";
import groupsRouter from "./Router/groupsRouter";

dotenv.config({path:"./.env"}); //Always on top

const port: string | number = process.env.PORT || 9999; //PORT will be built-in port number for any server otherwise 9999 helps to run in local
const dbUrl: string|undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName: string|undefined = process.env.MONGO_DB_DATABASE;

const app: express.Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        msg: "Welcome to the server!"
    })
})

app.use("/api/contacts",contactsRouter);
app.use("/api/groups",groupsRouter);

if(port){
    app.listen(port, () => {
        if(dbUrl && dbName){
            DBUtil.connectToDB(dbUrl,dbName).then((dbResponse) => {
                console.log(dbResponse)
            }).catch((error) => {
                console.error(error);
            })
        }
        console.log(`Express server started at ${port}`);
    })
}