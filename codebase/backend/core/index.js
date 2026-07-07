import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import pureIP from "express-pureip";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { ExpressServer, configTest, fallbackRoute, errorRoute } from "express-web-tools";
import { publishEvent } from "./utils/index.js"
import {
    createDirIfNotExist,
    setOrigin
} from "./utils/index.js";
import moduleRouter from "../modules/index.js";
(async () => {
    try {
        configTest([
            "PORT",
            "DB",
            "SESSION_SECRET",
            "JWT_SECRET",
            "PWD",
            "PRAVAH_URL",
            "PRAVAH_API_KEY"
        ])
        const publicDir = `${process.env.PWD}/public`;
        createDirIfNotExist(publicDir)
        await mongoose.connect(process.env.DB)
        const app = new ExpressServer();
        app.addMiddleware([
            express.static(publicDir),
            setOrigin,
            cors({}),
            cookieParser(),
            express.json(),
            express.urlencoded({
                extended: true
            }),
            fileUpload(),
            pureIP,
        ])
        app.addRoute("/api/v1", moduleRouter) //Add routes
        app.addMiddleware([
            errorRoute,
            fallbackRoute
        ])
        app.start(process.env.PORT)
        console.log("Server started")
    } catch (error) {
        console.log(`[error]: ${error.message}`);
    }
})();