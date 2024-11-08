"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ContactSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    groupId: { type: String, required: true },
}, { timestamps: true });
const ContactTable = mongoose_1.default.model("Contact", ContactSchema);
exports.default = ContactTable;
