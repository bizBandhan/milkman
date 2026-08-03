import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";

let schema = new MongooseModel(
    "Milkshop",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            lowercase: true
        },
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
        },
        members:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
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
const milkshop= schema.model();

export { milkshop }