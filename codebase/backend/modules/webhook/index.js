import { asyncHandler, HttpError } from "express-web-tools";
import { Router } from "express";
import { publishEvent } from "../../core/utils/index.js";
import { User } from "../user/controller/index.js"
let router = Router();
function extractUUID(message) {
    return message.match(
        /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i
    )?.[0] ?? null;
}
function extractPhone(sender) {
    return sender.match(
        /\b[0-9]+\b/i
    )?.[0] ?? null;
}

// console.log(extractUUID("Request ID: 550e8400-e29b-41d4-a716-446655440000"));
router
    .route('/webhook')
    .get(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .post(
        asyncHandler(
            async (req, res) => {
                const { content, sender, sender_name } = req.body;
                const uuid = extractUUID(content);
                if (!uuid)
                    throw new HttpError(404, "Not found")
                const phone = extractPhone(sender);
                User.request = req;
                let token = await User.loginOrRegister(uuid, phone)
                console.log({token}) //for debugging
                let resp = await publishEvent({
                    event: `login-${uuid}`,
                    id: phone
                })
                res.json({ status: "success", message: "Login Successful" })
            }
        )
    )
    .put(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .patch(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
    .delete(async (req, res) => { res.json({ status: "success", message: "Not implemented" }) })
export default router;