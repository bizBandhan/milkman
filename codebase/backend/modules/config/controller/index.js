import { CrudController } from "express-web-tools";
import { default as configModel } from "../model/index.js";

class Config extends CrudController {
    constructor(model){
        super(model)
        this.seed()
    }
    async seed(){
        let count=await this.count();
        if(count>0)return;
        let temp=await this.create({
            name:"whatsapp-no",
            value:"918130202879"
        })
    }
}

export default new Config(configModel)