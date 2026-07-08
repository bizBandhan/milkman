import { CrudController } from "express-web-tools";
import { Permission as permissionModel } from "../model/index.js"

class Permission extends CrudController { }

export default new Permission(permissionModel)