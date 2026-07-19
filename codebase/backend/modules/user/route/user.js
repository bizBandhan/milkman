import { CrudRoutes } from "express-web-tools";
import { User as userController } from "../controller/index.js";

const userRoutes = new CrudRoutes(
    "",
    userController
)

export default userRoutes.publish();