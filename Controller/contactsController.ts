import {Response,Request} from "express";
import {APP_STATUS} from "../Constants/constants";
import {body, validationResult} from "express-validator";
import ContactTable from "../database/ContactSchema";
import {IContact} from "../Models/IContact";
import mongoose from "mongoose";

export const getAllContacts = async (request:Request,response:Response)=> {
    try{
    let contacts:IContact[]|undefined = await ContactTable.find();
    if(contacts){
        return response.status(200).json({
            Status:APP_STATUS.SUCCESS,
            data:contacts,
            msg:""
        })
    }
    }catch (error:any) {
        return response.status(500).json({
            Status : APP_STATUS.FAILED,
            data:null,
            error:error.message
        })
    }
}

export const getContact = async (request:Request,response:Response)=> {
    try{
        let {contactId} = request.params;
        let contact = await ContactTable.findById(contactId);
        if(!contact){
            return response.status(404).json({
                Status : APP_STATUS.FAILED,
                data:null,
                error:"Contact not found"
            })
        }
        return response.status(200).json({
            Status : APP_STATUS.SUCCESS,
            data:contact,
            msg:""
        })
    }catch (error:any) {
        return response.status(500).json({
            Status : APP_STATUS.FAILED,
            data:null,
            error:error.message
        })
    }
}

export const createContact = async (request:Request,response:Response)=> {
    //checking the validations
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(500).json({
            errors:errors.array()
        });
    }

    try{
        //reading form data
        let {name,imageUrl,email,mobile,company,title,groupId} = request.body;

        //check if mobile number exists in the record
        let contact = await ContactTable.findOne({mobile:mobile});
        if(contact){
            return response.status(400).json({
                status:APP_STATUS.FAILED,
                data:null,
                error:"Mobile number already exists"
            })
        }

        //creating contact

        let theContactObj:IContact = {
            name:name,
            imageUrl:imageUrl,
            email:email,
            mobile:mobile,
            company:company,
            title:title,
            groupId:groupId
        }

        theContactObj = await new ContactTable(theContactObj).save();
        if(theContactObj){
            return response.status(200).json({
                Status:APP_STATUS.SUCCESS,
                data:theContactObj,
                msg: "Contact created!"
            })
        }
    }catch (error:any) {
        return response.status(500).json({
            Status : APP_STATUS.FAILED,
            data:null,
            error:error.message
        })
    }
}

export const updateContact = async (request:Request,response:Response)=> {
    //checking the validations
    const {contactId} = request.params;
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(500).json({
            errors:errors.array()
        });
    }
    try{

        //reading form data
        let {name,imageUrl,email,mobile,company,title,groupId} = request.body;

        //checking if the contact exists

        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        const contact:IContact|null|undefined = await ContactTable.findById(mongoContactId);
        if(!contact){
            return response.status(404).json({
                Status : APP_STATUS.FAILED,
                data:null,
                error:"Contact not found"
            })
        }
        //updation
        let theContactObj:IContact|null = {
            name:name,
            imageUrl:imageUrl,
            email:email,
            mobile:mobile,
            company:company,
            title:title,
            groupId:groupId
        }

        theContactObj = await ContactTable.findByIdAndUpdate(mongoContactId,{
            $set: theContactObj,
        },{new:true});

        if(theContactObj){
            return response.status(200).json({
                Status:APP_STATUS.SUCCESS,
                data:theContactObj,
                msg:"Contact updated successfully"
            })
        }

    }catch (error:any) {
        return response.status(500).json({
            Status : APP_STATUS.FAILED,
            data:null,
            error:error.message
        })
    }
}

export const deleteContact = async (request:Request,response:Response)=> {
    try{
        let {contactId} = request.params;
        let mongoContactId = new mongoose.Types.ObjectId(contactId);
        let contact:IContact|null|undefined = await ContactTable.findById(mongoContactId);
        if(!contact){
            return response.status(404).json({
                status:APP_STATUS.FAILED,
                data:null,
                error:"Contact not found"
            })
        }

        let theContact:IContact|null|undefined = await ContactTable.findByIdAndDelete(mongoContactId);
        if(theContact){
            return response.status(200).json({
                Status:APP_STATUS.SUCCESS,
                data:{},
                msg:"Contact deleted successfully"
            })
        }
    }catch (error:any) {
        return response.status(500).json({
            Status : APP_STATUS.FAILED,
            data:null,
            error:error.message
        })
    }
}