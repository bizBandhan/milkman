import { Router } from "express";
import { isAuthenticated } from "../guard/index.js";
import meRouter from "./me.js";
import userRouter from "./user.js";
const router = Router();
router
    .use("/me",isAuthenticated,meRouter)
    .use("/user",isAuthenticated,userRouter)
export default router;