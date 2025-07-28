// IMPORTING STUFF
import mongoose from "mongoose";
import testingData from "./Data";
import Beat from "../model/Beat";
import { log } from "node:console";
import dotenv from "dotenv";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// USING STUFF
dotenv.config();

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// CONNETING DB
const URL = process.env.MONGO_URI!;

mongoose
  .connect(URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// INITIALIZING DB
const initializeData = async () => {
  await Beat.deleteMany({});
  await Beat.insertMany(testingData);
  log("Data is inserted in Database.");
};

initializeData();
