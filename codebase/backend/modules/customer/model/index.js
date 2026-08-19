import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";


const schema = new MongooseModel(
    "Customer",
    new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        address:{
            type:String
        },
        members:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }]
    }),
    [
    ],
    {},
    {
        auditEnforce: true,
        multitenant: true,
        softDelete: true,
        timestamps: true
    }
);

export default schema.model();