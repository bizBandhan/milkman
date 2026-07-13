/* 
Resposible for following routes:
    /me
    /login
    /register
    /user
    /user/:id
*/
import { Router } from "express";
import { asyncHandler, HttpError } from "express-web-tools";
import { User as userController } from "../controller/index.js";
import { isAuthenticated } from "../guard/index.js";
const router = Router();
router
    .route('/me')
    .all(isAuthenticated)
    .get(
        asyncHandler(
            async (req, res) => {
                res.json({ status: "success", message: "", data: req.user })
            }
        )
    )
    .post(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
export default router;