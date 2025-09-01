import { Request, Response } from "express";
import express from "express";
import Beat from "../model/Beat";
import { timeStamp } from "console";

const router = express.Router();

// ✅ Get all beats
router.get("/", async (req: Request, res: Response) => {
  try {
    const beats = await Beat.find().sort({ createdAt: -1 });
    res.status(200).json(beats);
  } catch (err) {
    console.error("Error fetching beats:", err);
    res.status(500).json({ error: "Failed to fetch beats" });
  }
});

// ✅ Get one beat by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const beat = await Beat.findById(id);
    if (!beat) {
      return res.status(404).json({ error: "Beat not found" });
    }
    res.status(200).json(beat);
  } catch (err) {
    console.error("Error fetching beat:", err);
    res.status(500).json({ error: "Failed to fetch beat" });
  }
});

// ✅ Create new beat
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
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
    } = req.body;

    if (!title || !audioUrl) {
      return res.status(400).json({ error: "Title and audioUrl are required" });
    }

    const newBeat = new Beat({
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

    const savedBeat = await newBeat.save();
    res.status(201).json(savedBeat);
  } catch (err) {
    console.error("Error creating beat:", err);
    res.status(500).json({ error: "Failed to create beat" });
  }
});

// ✅ Update existing beat
router.put("/:id", async (req: Request, res: Response) => {
  try {
    // Destructure all possible fields from request body
    const {
      title,
      description,
      coverImage,
      audioUrl,
      duration,
      bpm,
      scale,
      genre,
      mood,
      price,
      purchaseLink,
      releaseDate,
    } = req.body;

    // Build an update object with only the fields that are provided
    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (coverImage !== undefined) updateFields.coverImage = coverImage;
    if (audioUrl !== undefined) updateFields.audioUrl = audioUrl;
    if (duration !== undefined) updateFields.duration = duration;
    if (bpm !== undefined) updateFields.bpm = bpm;
    if (scale !== undefined) updateFields.scale = scale;
    if (genre !== undefined) updateFields.genre = genre;
    if (mood !== undefined) updateFields.mood = mood;
    if (price !== undefined) updateFields.price = price;
    if (purchaseLink !== undefined) updateFields.purchaseLink = purchaseLink;
    if (releaseDate !== undefined) updateFields.releaseDate = releaseDate;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update" });
    }

    const updatedBeat = await Beat.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedBeat) {
      return res.status(404).json({ error: "Beat not found" });
    }

    res.status(200).json({
      message: "Beat updated successfully!",
      beat: updatedBeat,
    });
  } catch (err) {
    console.error("Error updating beat:", err);
    res.status(500).json({ error: "Failed to update beat" });
  }
});


// ✅ Delete beat
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedBeat = await Beat.findByIdAndDelete(req.params.id);

    if (!deletedBeat) {
      return res.status(404).json({ error: "Beat not found" });
    }

    res.status(200).json({ message: "Beat deleted successfully!" });
  } catch (err) {
    console.error("Error deleting beat:", err);
    res.status(500).json({ error: "Failed to delete beat" });
  }
});

export default router;
