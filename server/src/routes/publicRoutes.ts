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
    const beats = await Beat.find();
    res.status(200).json(beats);
  })
);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET SINGLE BEAT DATA
import { Request, Response } from "express";

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
