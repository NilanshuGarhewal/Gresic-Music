// IMPORING STUFF
import mongoose from "mongoose";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// DEFINING BEAT SCHEMA
const beatSchema = new mongoose.Schema({
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
});

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// EXPORTING SCHEMA
export default mongoose.model("Beat", beatSchema);
