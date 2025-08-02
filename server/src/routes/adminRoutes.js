"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Beat_1 = __importDefault(require("../model/Beat"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const checkAdmin_1 = require("../middlewares/checkAdmin");
const safeRoute_1 = __importDefault(require("../middlewares/safeRoute"));
const router = express_1.default.Router();
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// ADMIN ONLY ROUTE
// CREATE A BEAT ROUTE
router.post("/beats", checkAdmin_1.checkAdmin, (0, express_async_handler_1.default)((0, safeRoute_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBeat = new Beat_1.default(req.body);
    const saved = yield newBeat.save();
    res.status(201).json(saved);
}))));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// EDIT
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// DELETE
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// EXPORTING ROUTES
exports.default = router;
