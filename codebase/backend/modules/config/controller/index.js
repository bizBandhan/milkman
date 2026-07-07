import { CrudController } from "express-web-tools";
import { default as configModel } from "../model/index.js";

class Config extends CrudController {

}

export default new Config(configModel)