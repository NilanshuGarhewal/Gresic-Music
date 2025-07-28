// IMPORTING STUFF
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// ROUTES IMPORTING
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// USAGE OF ESSENTIALS
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// MONGO DB

const URL = process.env.MONGO_URI!;

mongoose
  .connect(URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// API & ROUTES

// PUBLIC ROUTES
app.use("/", publicRoutes);

// ADMIN ROUTES
app.use("/admin", adminRoutes);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// EXPORTING APP
export default app;
