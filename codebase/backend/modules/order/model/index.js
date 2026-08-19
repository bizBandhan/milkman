import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";


const schema = new MongooseModel(
    "Order",
    new mongoose.Schema({
        date: {
            type: Date
        },
        slot: {
            type: String,
            enum: ["morning", "evening"]
        },
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
            }
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seller"
        },
        deliveryState: {
            type: String,
            enum: ["planned", "deliverred", "cancelled"]
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