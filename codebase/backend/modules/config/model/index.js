import mongoose, { mongo } from "mongoose"
import { MongooseModel } from "express-web-tools"

const schema = new MongooseModel(
    "Config",
    new mongoose.Schema({
        name: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        value: {
            type: String,
        }
    }),
    [
        [
            {
                name: 1,
                origin: 1,
            }, {
                unique: true
            }
        ]
    ],
    {},
    {
        multitenant: false,
        auditEnforce: false,
        softDelete: false,
        timestamps: true
    }
);
export default schema.model();