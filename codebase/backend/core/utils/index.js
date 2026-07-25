import fs from "fs"
import { API } from "express-web-tools";

export function createDirIfNotExist(dirPath) {
    if (fs.existsSync(dirPath)) return;
    fs.mkdirSync(dirPath, { recursive: true });
}
export function setOrigin(req, res, next) {
    const {origin} = process.env;
    console.log({
        url:req.url,
        method:req.method
    })
    req.origin=origin;
    next();
}
const url = process.env.PRAVAH_URL;
const apiKey = process.env.PRAVAH_API_KEY
export async function publishEvent({ streamId = "bizbandhan-milkman", event, id = null }) {
    let pravahEndpoint = new API({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        },
        useHttps: false
    })
    return await pravahEndpoint.post(
        "pravah/publish",
        {
            streamId,
            event,
            data: {
                id
            }
        }
    )
}