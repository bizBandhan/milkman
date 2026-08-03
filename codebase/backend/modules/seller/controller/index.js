import { CrudController } from "express-web-tools";
import { milkshop as milkshopModel } from "../model/index.js"

class Milkshop extends CrudController {
 }

const milkshopController = new Milkshop(milkshopModel);
export { milkshopController };