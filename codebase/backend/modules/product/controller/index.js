import { CrudController } from "express-web-tools";
import Product from "../model/index.js";

class ProductController extends CrudController { }

export default new ProductController(Product);