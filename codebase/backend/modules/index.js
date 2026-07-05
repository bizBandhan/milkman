import { Router } from "express";
import { eventStream, fsLogger } from "express-web-tools";
import { publishEvent } from "../core/utils/index.js";

eventStream.addListener("server-started", (e) => {
    fsLogger.Log(`${e.message}`)
})

eventStream.addListener("error", (e) => {
    fsLogger.Log(`${e.message}`, e)
})

eventStream.addListener("fallback", (e) => {
    fsLogger.Log(`${e.message??"Fallback"}`, e)
})

let router = Router();
// router.use((r,s,n)=>{
//     console.log(r);
//     n();
// })
router
.route('/test')
.get    (async (req, res) => { 
    let resp=await publishEvent({
        event:`login-49507c17-5ed1-4192-8a49-d65008e0b44d`,
        id:"lorem ipsum"
    })
    res.json({ status: "success", message: "Not implemented",data:resp }) })
.post   (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.put    (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.patch  (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
.delete (async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
export default router;