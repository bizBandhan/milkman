import { CrudController } from "express-web-tools";
import { milkshop as milkshopModel } from "../model/index.js"

class Milkshop extends CrudController {
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        return super.list({
            ...query,
            members: this?.request?.user?._id?.toString()
        },
            populateFields,
            sort,
            project
        )
    }
}

const milkshopController = new Milkshop(milkshopModel);
export { milkshopController };