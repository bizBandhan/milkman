import { CrudController } from "express-web-tools";
import { Role as roleModel } from "../model/index.js"

class Role extends CrudController { }

export default new Role(roleModel)