import {Router,Request,Response} from 'express';
import * as contactsController from "../Controller/contactsController";
import {body,validationResult} from "express-validator";

const contactsRouter:Router = Router();

contactsRouter.get("/", async (request: Request, response: Response) => {
    await contactsController.getAllContacts(request,response);
})

contactsRouter.get("/:contactId", async (request: Request, response: Response) => {
    await contactsController.getContact(request,response);
})

contactsRouter.post("/",[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('imageUrl').not().isEmpty().withMessage('ImageURL is required'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('mobile').not().isEmpty().withMessage('Mobile is required'),
    body('company').not().isEmpty().withMessage('Company is required'),
    body('title').not().isEmpty().withMessage('Title is required'),
    body('groupId').not().isEmpty().withMessage('Group is required')
], async (request: Request, response: Response) => {
    await contactsController.createContact(request,response);
})

contactsRouter.put("/:contactId",[
    body('name').not().isEmpty().withMessage('Name is required'),
    body('imageUrl').not().isEmpty().withMessage('ImageURL is required'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('mobile').not().isEmpty().withMessage('Mobile is required'),
    body('company').not().isEmpty().withMessage('Company is required'),
    body('title').not().isEmpty().withMessage('Title is required'),
    body('groupId').not().isEmpty().withMessage('Group is required')
], async (request: Request, response: Response) => {
    await contactsController.updateContact(request,response);
})

contactsRouter.delete("/:contactId", async (request: Request, response: Response) => {
    await contactsController.deleteContact(request,response);
})

export default contactsRouter;