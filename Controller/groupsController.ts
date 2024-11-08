import {Response,Request} from "express";
import {APP_STATUS} from "../Constants/constants";
import {validationResult} from "express-validator";
import GroupTable from "../database/GroupSchema";
import {IGroup} from "../Models/IGroup";
import ContactTable from "../database/ContactSchema";

export const getAllGroups = async (request:Request,response:Response)=> {
    try{
        const groups:IGroup[]|undefined = await GroupTable.find();
        if(groups){
            return response.status(200).json({
                Status:APP_STATUS.SUCCESS,
                data:groups,
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

export const createGroup = async (request:Request,response:Response)=> {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors:errors.array()});
    }
    try{
        //read form data
        let {name} = request.body;

        //checking if name already exists
        const group:IGroup|null|undefined = await GroupTable.findOne({name:name});
        if(group){
            return response.status(400).json({
                Status : APP_STATUS.FAILED,
                data:null,
                error:"Group already exists"
            })
        }

        //create now
        const thegroup:IGroup |null |undefined=await new GroupTable({name:name}).save();
        if(thegroup){
            return response.status(200).json({
                Status:APP_STATUS.SUCCESS,
                data:thegroup,
                msg:"Group created successfully!"
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