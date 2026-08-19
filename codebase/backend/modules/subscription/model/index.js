import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";


const schema = new MongooseModel(
    "Subscription",
    new mongoose.Schema({
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        product: {
            name: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            subscribedUnits: {
                type: Number,
                required: true
            },
            stepSize: {
                type: Number,
                required: true
            },
            slot: {
                type: String,
                enum: ["morning", "evening"]
            }
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller"
        }
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