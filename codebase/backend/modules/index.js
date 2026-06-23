import { Router } from "express";
import { eventStream, fsLogger } from "express-web-tools";

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

export default router;