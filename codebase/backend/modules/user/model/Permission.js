import { MongooseModel } from "express-web-tools";
import mongoose from "mongoose";

const schema = new MongooseModel(
    "Permission",
    new mongoose.Schema({
        authorization:{
            type:String,
            trim:true
            //stores user:91xxxxx or role:admin 
        },
        module:{
            type:String,
            required:true
            // user management
        },
        feature:{
            type:String,
            required:true
            // administration
        },
        action:[
            {
                type:String
            }
        ] //read, create, update, delete
    }),
    [
        [
            {
                authorization: 1,
                module:1,
                feature:1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ],
    null,
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: true,
        timestamps: true
    }
);
export default schema.model();