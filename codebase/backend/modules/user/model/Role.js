import { MongooseModel } from "express-web-tools";
import mongoose from "mongoose";

const schema = new MongooseModel(
    "Role",
    new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            lowercase: true
        },
        description: {
            type: String,
            trim: true
        }
    }),
    [
        [
            {
                name: 1,
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