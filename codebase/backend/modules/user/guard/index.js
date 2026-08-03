import { asyncHandler, HttpError } from "express-web-tools";
import { User as userController } from "../controller/index.js";

const isAuthenticated = asyncHandler(
    async (req, res, next) => {

        const pravahID = req.cookies.pravah_id;
        if (!pravahID) {
            throw new HttpError(401, "Authentication Required");
        }
        userController.request = req;
        req.user = await userController.userInfo(pravahID)
        next();
    }
)

export { isAuthenticated };