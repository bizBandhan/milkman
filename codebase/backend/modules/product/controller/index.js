import { CrudController } from "express-web-tools";
import Product from "../model/index.js";

class ProductController extends CrudController {
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        return super.list({
            ...query,
            seller: this?.request?.seller?._id?.toString()
        },
            populateFields,
            sort,
            project
        )
    }
}

export default new ProductController(Product);