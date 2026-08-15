import { Router } from "express";
import { eventStream, fsLogger } from "express-web-tools";
import { publishEvent } from "../core/utils/index.js";
import { default as configRouter } from "./config/route/index.js";
import { default as authRoutes } from "./user/route/index.js";
import { milkshopRoutes } from "./seller/route/index.js";
import productRoutes from "./product/route/index.js";
eventStream.addListener("server-started", (e) => {
    fsLogger.Log(`${e.message}`)
})

eventStream.addListener("error", (e) => {
    fsLogger.Log(`${e.message}`, e)
})

eventStream.addListener("fallback", (e) => {
    fsLogger.Log(`${e.message ?? "Fallback"}`, e)
})

let router = Router();
router
    .use(authRoutes)
    .use("/seller", milkshopRoutes)
    .use("/product",productRoutes)
    // todo: Add isAuthenticated middleware to protect 
    .use("/config", configRouter)

export default router;