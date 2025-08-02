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
// IMPORTING STUFF
const mongoose_1 = __importDefault(require("mongoose"));
const Data_1 = __importDefault(require("./Data"));
const Beat_1 = __importDefault(require("../model/Beat"));
const node_console_1 = require("node:console");
const dotenv_1 = __importDefault(require("dotenv"));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// USING STUFF
dotenv_1.default.config();
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// CONNETING DB
const URL = process.env.MONGO_URI;
mongoose_1.default
    .connect(URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->
// INITIALIZING DB
const initializeData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Beat_1.default.deleteMany({});
    yield Beat_1.default.insertMany(Data_1.default);
    (0, node_console_1.log)("Data is inserted in Database.");
});
initializeData();
