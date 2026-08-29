import {CrudController} from "express-web-tools";
import {default as subscriptionModel} from "../model/index.js";

class Subscription extends CrudController{

}

export default new Subscription(subscriptionModel)