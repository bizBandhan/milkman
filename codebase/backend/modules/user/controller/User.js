import { CrudController, HttpError, Token } from "express-web-tools";
import { User as userModel } from "../model/index.js";

class User extends CrudController {
    async userInfo(uuid) {
        const user = await this.findOne({
            "activeDevices.pravahID":uuid
        });
        if (!user) throw new HttpError(401, "Authentication required")
        return user;
    }
    
    async logout(device){
        if(!device)throw new HttpError(401,"Device not identified");
        let user=this.request.user;
        user.activeDevices=user.activeDevices.filter(d=>d.pravahID!=device);
        return await this.update(user._id,{activeDevices:user.activeDevices})
    }
    register() { }
    subscribe() { }
    unsubscribe() { }
    async loginStatus(uuid, phone) {
        return await this.findOne({
            phone,
            "activeDevices.pravahID": uuid
        });
    }
    async logoutOthers(uuid, phone) {
        await this.model.updateMany(
            {
                ...this.commonFilters,
                "activeDevices.pravahID": uuid,
                "phone": {
                    $nin: [phone]
                }
            },
            {
                $pull: {
                    activeDevices: {
                        pravahID: uuid
                    }
                }
            }
        )
    }
    async findUserByPhone(phone) {
        return await this.findOne({ phone });
    }
    async loginOrRegister(uuid, sender) {
        await this.logoutOthers(uuid, sender)
        if (Boolean(await this.loginStatus(uuid, sender))) {
            throw new HttpError(401, "Already logged in")
        }
        let user = await this.findUserByPhone(sender);
        if (!user) {
            user = new this.model({
                phone: sender,
                "activeDevices": [{ pravahID: uuid }],
                ...this.commonFilters
            })
        } else {
            user.activeDevices.push({
                pravahID: uuid
            })
        }
        await user.save();
        return Boolean(user);
    }
}

export default new User(userModel);