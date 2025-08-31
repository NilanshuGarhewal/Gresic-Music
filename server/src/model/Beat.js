"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORING STUFF
const mongoose_1 = __importDefault(require("mongoose"));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// DEFINING BEAT SCHEMA
const beatSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: String,
    coverImage: String,
    audioUrl: { type: String, required: true },
    duration: String,
    bpm: Number,
    scale: String,
    genre: [String],
    mood: [String],
    price: String,
    purchaseLink: String,
    releaseDate: String,
}, { timestamps: true });
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// EXPORTING SCHEMA
exports.default = mongoose_1.default.model("Beat", beatSchema);
