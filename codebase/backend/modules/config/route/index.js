import express from "express";
import { asyncHandler } from "express-web-tools";
import { default as configController } from "../controller/index.js"
const router = express.Router();
router
    .route('/')
    .get(
        asyncHandler(
            async (req, res) => {
                configController.request = req;
                const data = await configController.list();
                return res.json({
                    status: "success",
                    message: "",
                    data:data.reduce((a,c)=>{
                        a[c.name]=c.value;
                        return a;
                    },{})
                })
            }
        )
    )
    .post(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })

export default router;