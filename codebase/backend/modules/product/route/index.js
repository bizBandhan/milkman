import { CrudRoutes } from "express-web-tools";
import productController from "../controller/index.js";
import { isAuthenticated } from "../../user/guard/index.js";
const productRoutes = new CrudRoutes(
    "",
    productController,
    {
        global: [isAuthenticated],
        add: [
            (req, res, next) => {
                let body=req.body;
                if(body._id){
                    delete(body._id)
                }
                req.body=body;
                next();
            }
        ]
    }
)

export default productRoutes.publish();