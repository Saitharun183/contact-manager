import { Router,Request, Response } from 'express';
import * as groupsController from "../Controller/groupsController";
import {body,validationResult} from "express-validator";

const groupsRouter: Router = Router();

groupsRouter.get("/",async (request: Request, response: Response) => {
    await groupsController.getAllGroups(request,response);
})

groupsRouter.post("/",[
    body("name").not().isEmpty().withMessage('Name is required')
],async (request: Request, response: Response) => {
    await groupsController.createGroup(request,response);
})

export default groupsRouter;