import { Request, Response } from "express";
import express from "express";
import Beat from "../model/Beat";

import safeRoute from "../middlewares/safeRoute";

const router = express.Router();

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET ALL BEATS ROUTES
router.get(
  "/",
  safeRoute(async (req: Request, res: Response) => {
    const beats = await Beat.find().sort({ createdAt: -1 });
    res.status(200).json(beats);
  })
);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET 12 RANDOM BEATS
router.get("/random", async (req: Request, res: Response) => {
  const beats = await Beat.aggregate([{ $sample: { size: 24 } }]);
  res.status(200).json(beats);
});

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET SINGLE BEAT DATA

router.get(
  "/track/:id",
  safeRoute(async (req: Request, res: Response) => {
    const { id } = req.params;
    const beat = await Beat.findById(id);
    res.status(200).json(beat);
  })
);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// EXPORT ROUTER
export default router;
