import { HttpError, asyncHandler } from "express-web-tools";
import { milkshopController } from "../controller/index.js";

const getSeller = asyncHandler(
    async (req, res, next) => {
        const user = req.user;
        if (!user) {
            throw new HttpError(403, "Permission denied");
        }
        milkshopController.request = req;
        let temp = await milkshopController.findOne({
            members: user._id
        });
        if (!temp) {
            throw new HttpError(401, "Complete your registration");
        }
        req.seller = temp;
        next();
    }
)

export { getSeller };