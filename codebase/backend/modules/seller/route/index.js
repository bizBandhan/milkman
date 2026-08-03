import { CrudRoutes } from "express-web-tools";
import { milkshopController } from "../controller/index.js";
import { isAuthenticated } from "../../user/guard/index.js";

class Milkshop extends CrudRoutes {
 }

const crudRoutes = new Milkshop("", milkshopController,{
    global:[isAuthenticated],
});
const milkshopRoutes=crudRoutes.publish();
export { milkshopRoutes };
