import { MongooseModel } from "express-web-tools";
import mongoose from "mongoose";

const schema = new MongooseModel(
    "User",
    new mongoose.Schema({
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        name: {
            type: String,
            trim: true
        },
        gender: {
            type: String
        },
        role: {
            type: String
        },
        webpush: [
            {
                pravahID: { type: String, trim: true, lowercase: true },
                endpoint: { type: String },
                expiration: { type: mongoose.Schema.Types.Mixed },
                keys: { type: mongoose.Schema.Types.Mixed }
            }
        ],
        activeDevices: [
            {
                pravahID: {
                    type: String
                }
            }
        ]
    }),
    [
        [
            {
                phone: 1,
                origin: 1
            },
            {
                unique: true
            }
        ],
        [
            {
                email: 1,
                origin: 1
            },
            {
                unique: true,
                partialFilterExpression: {
                    email: { $exists: true, $ne: null }
                }
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