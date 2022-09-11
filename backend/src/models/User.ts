import { ObjectId } from "../deps.ts";

// Defining schema interface
export interface UserSchema {
    _id?: ObjectId;
    name: string;
    ms_oid: string;
    email: string;
}