"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTING STUFF
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// ROUTES IMPORTING
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// USAGE OF ESSENTIALS
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// MONGO DB
const URL = process.env.MONGO_URI;
if (URL) {
    mongoose_1.default
        .connect(URL)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.error(err));
}
else {
    throw new Error("NO URL FOUND!");
}
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// API & ROUTES
// PUBLIC ROUTES
app.use("/", publicRoutes_1.default);
// ADMIN ROUTES
app.use("/admin", adminRoutes_1.default);
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// EXPORTING APP
exports.default = app;
