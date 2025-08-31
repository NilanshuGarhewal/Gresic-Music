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
const safeRoute_1 = __importDefault(require("../middlewares/safeRoute"));
const router = express_1.default.Router();
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// GET ALL BEATS ROUTES
router.get("/", (0, safeRoute_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beats = yield Beat_1.default.find().sort({ createdAt: -1 });
    res.status(200).json(beats);
})));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// GET 12 RANDOM BEATS
router.get("/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beats = yield Beat_1.default.aggregate([{ $sample: { size: 24 } }]);
    res.status(200).json(beats);
}));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// GET SINGLE BEAT DATA
router.get("/track/:id", (0, safeRoute_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const beat = yield Beat_1.default.findById(id);
    res.status(200).json(beat);
})));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// EXPORT ROUTER
exports.default = router;
