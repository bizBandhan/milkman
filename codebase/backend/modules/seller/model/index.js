import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";

let schema = new MongooseModel(
    "Product",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            lowercase: true
        },
        phone: [{
            type: String,
        }],
        email: [{
            type: String
        }],
        address: {
            type: String
        },
        upi: {
            id: {
                type: String
            },
            qr: {
                type: String
            }
        }
    }),
    [
        [
            {
                name: 1,
            }, {
                unique: true
            }
        ]
    ],
    {
    },
    {
        softDelete: true,
        multitenent: true,
        auditEnforce: true,
        timestamps: true
    }
);
export default schema.model();