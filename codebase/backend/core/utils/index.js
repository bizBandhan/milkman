import fs from "fs"

export function createDirIfNotExist(dirPath) {
    if (fs.existsSync(dirPath)) return;
    fs.mkdirSync(dirPath, { recursive: true });
}
export function setOrigin(req, res, next) {
    const origin = req.headers.origin || req.headers.referer;
    if (origin) {
        try {
            const url = new URL(origin);
            req.origin = url.hostname;
        } catch (e) {
            req.origin = req.headers.host;
        }
    } else {
        req.origin = req.headers.host;
    }
    next();
}
