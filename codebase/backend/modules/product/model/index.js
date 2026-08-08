import mongoose from "mongoose";
import { MongooseModel } from "express-web-tools";

let schema = new MongooseModel(
    "Product",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        unit: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        stepSize: {
            type: Number,
            required: true,
            default: 0.25
        },
        price: {
            type: Number,
            required: true,
            default: 65
        },
        minimumOrder: {
            type: Number,
            default: 0.5
        },
        totalAvailability: {
            type: Number,
            default: 20
        }
    }),
    [
        [
            {
                name: 1,
                unit: 1,
                stepSize: 1
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