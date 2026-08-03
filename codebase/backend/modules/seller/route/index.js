import { CrudRoutes } from "express-web-tools";
import { milkshopController } from "../controller/index.js";

class Milkshop extends CrudRoutes { }

const milkshopRoutes = new Milkshop(milkshopController);
export { milkshopRoutes };
