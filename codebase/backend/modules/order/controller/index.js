import {CrudController} from "express-web-tools";
import {default as orderModel} from "../model/index.js";

class Order extends CrudController{

}

export default new Order(orderModel)