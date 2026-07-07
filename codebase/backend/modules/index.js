import { Router } from "express";
import { eventStream, fsLogger } from "express-web-tools";
import { publishEvent } from "../core/utils/index.js";
import { default as configRouter } from "./config/route/index.js";
import { default as authRoutes } from "./user/route/index.js";

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
// router.use((r,s,n)=>{
//     console.log(r);
//     n();
// })
router
    .route('/test')
    .get(async (req, res) => {
        let resp = await publishEvent({
            event: `login-07e9beab-5fa6-44bd-9c97-b76b35c5e3ff`,
            id: "lorem ipsum"
        })
        res.json({ status: "success", message: "Not implemented", data: resp })
    })
    .post(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
router
    .use(authRoutes)
    .use("/config", configRouter)

export default router;