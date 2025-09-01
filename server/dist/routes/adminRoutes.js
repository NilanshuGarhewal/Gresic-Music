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
const router = express_1.default.Router();
// ✅ Get all beats
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beats = yield Beat_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(beats);
    }
    catch (err) {
        console.error("Error fetching beats:", err);
        res.status(500).json({ error: "Failed to fetch beats" });
    }
}));
// ✅ Get one beat by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const beat = yield Beat_1.default.findById(id);
        if (!beat) {
            return res.status(404).json({ error: "Beat not found" });
        }
        res.status(200).json(beat);
    }
    catch (err) {
        console.error("Error fetching beat:", err);
        res.status(500).json({ error: "Failed to fetch beat" });
    }
}));
// ✅ Create new beat
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, bpm, audioUrl, genre, mood, scale, duration, price, description, coverImage, } = req.body;
        if (!title || !audioUrl) {
            return res.status(400).json({ error: "Title and audioUrl are required" });
        }
        const newBeat = new Beat_1.default({
            title,
            bpm,
            audioUrl,
            genre,
            mood,
            scale,
            duration,
            price,
            description,
            coverImage,
        });
        const savedBeat = yield newBeat.save();
        res.status(201).json(savedBeat);
    }
    catch (err) {
        console.error("Error creating beat:", err);
        res.status(500).json({ error: "Failed to create beat" });
    }
}));
// ✅ Update existing beat
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure all possible fields from request body
        const { title, description, coverImage, audioUrl, duration, bpm, scale, genre, mood, price, purchaseLink, releaseDate, } = req.body;
        // Build an update object with only the fields that are provided
        const updateFields = {};
        if (title !== undefined)
            updateFields.title = title;
        if (description !== undefined)
            updateFields.description = description;
        if (coverImage !== undefined)
            updateFields.coverImage = coverImage;
        if (audioUrl !== undefined)
            updateFields.audioUrl = audioUrl;
        if (duration !== undefined)
            updateFields.duration = duration;
        if (bpm !== undefined)
            updateFields.bpm = bpm;
        if (scale !== undefined)
            updateFields.scale = scale;
        if (genre !== undefined)
            updateFields.genre = genre;
        if (mood !== undefined)
            updateFields.mood = mood;
        if (price !== undefined)
            updateFields.price = price;
        if (purchaseLink !== undefined)
            updateFields.purchaseLink = purchaseLink;
        if (releaseDate !== undefined)
            updateFields.releaseDate = releaseDate;
        if (Object.keys(updateFields).length === 0) {
            return res
                .status(400)
                .json({ error: "At least one field is required to update" });
        }
        const updatedBeat = yield Beat_1.default.findByIdAndUpdate(req.params.id, updateFields, { new: true, runValidators: true });
        if (!updatedBeat) {
            return res.status(404).json({ error: "Beat not found" });
        }
        res.status(200).json({
            message: "Beat updated successfully!",
            beat: updatedBeat,
        });
    }
    catch (err) {
        console.error("Error updating beat:", err);
        res.status(500).json({ error: "Failed to update beat" });
    }
}));
// ✅ Delete beat
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBeat = yield Beat_1.default.findByIdAndDelete(req.params.id);
        if (!deletedBeat) {
            return res.status(404).json({ error: "Beat not found" });
        }
        res.status(200).json({ message: "Beat deleted successfully!" });
    }
    catch (err) {
        console.error("Error deleting beat:", err);
        res.status(500).json({ error: "Failed to delete beat" });
    }
}));
exports.default = router;
