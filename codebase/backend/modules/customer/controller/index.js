import {CrudController} from "express-web-tools";
import {default as customerModel} from "../model/index.js";

class Customer extends CrudController{

}

export default new Customer(customerModel)