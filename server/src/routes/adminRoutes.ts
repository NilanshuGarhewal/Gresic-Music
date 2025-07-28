import express from "express";
import Beat from "../model/Beat";
import asyncHandler from "express-async-handler";

import { checkAdmin } from "../middlewares/checkAdmin";
import safeRoute from "../middlewares/safeRoute";

const router = express.Router();

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// ADMIN ONLY ROUTE

// CREATE A BEAT ROUTE

router.post(
  "/beats",
  checkAdmin,
  asyncHandler(
    safeRoute(async (req, res) => {
      const newBeat = new Beat(req.body);
      const saved = await newBeat.save();
      res.status(201).json(saved);
    })
  )
);

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
export default router;
