/* 
Resposible for following routes:
    /me
    /login
    /register
    /user
    /user/:id
*/
import { Router } from "express";
import { asyncHandler, eventStream, HttpError } from "express-web-tools";
import { User as userController } from "../controller/index.js";
import { isAuthenticated } from "../guard/index.js";
import { publishEvent } from "../../../core/utils/index.js";
const router = Router();
router
    .route('/')
    .get(
        asyncHandler(
            async (req, res) => {
                res.json({ status: "success", message: "", data: req.user })
            }
        )
    )
    .post(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .put(
        asyncHandler(
            async (req, res) => {
                userController.request = req;
                let data = await userController.update(req?.user?._id, req.body)
                data?.activeDevices?.forEach(device => {
                    publishEvent({
                        event: `login-${device.pravahID}`,
                        id: data?.phone
                    })
                })
                return res.json({
                    status: "success",
                    message: "Updated",
                    data
                })
            }
        )
    )
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
export default router;