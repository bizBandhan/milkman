import { CrudController } from "express-web-tools";
import { User as userModel } from "../model/index.js";

class User extends CrudController {
    login(){}
    register(){}
    subscribe(){}
    unsubscribe(){}
}

export default new User(userModel);