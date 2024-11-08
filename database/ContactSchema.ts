import mongoose from "mongoose";
import {IContact} from "../Models/IContact";

const ContactSchema = new mongoose.Schema<IContact>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    company: {type: String, required: true},
    title: {type: String, required: true},
    groupId: {type: String, required: true},
},{timestamps: true});

const ContactTable = mongoose.model<IContact>("Contact", ContactSchema);
export default ContactTable;