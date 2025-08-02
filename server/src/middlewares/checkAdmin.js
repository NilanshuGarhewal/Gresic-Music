"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = checkAdmin;
function checkAdmin(req, res, next) {
    const secret = req.headers["x-admin-secret"];
    if (secret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    next();
}
