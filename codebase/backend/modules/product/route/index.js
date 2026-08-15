import { asyncHandler, CrudRoutes, HttpError } from "express-web-tools";
import productController from "../controller/index.js";
import { isAuthenticated } from "../../user/guard/index.js";
import { getSeller } from "../../seller/guard/index.js"
const productRoutes = new CrudRoutes(
    "",
    productController,
    {
        global: [isAuthenticated, getSeller],
        add: [
            asyncHandler(
                async (req, res, next) => {
                    let { seller } = req;
                    if (!seller) throw HttpError(403, "Permission Denied");
                    let body = req.body;
                    if (body._id) {
                        delete (body._id)
                    }
                    body.seller = seller?._id?.toString();
                    req.body = body;
                    next();
                }
            )
        ]
    }
)

export default productRoutes.publish();