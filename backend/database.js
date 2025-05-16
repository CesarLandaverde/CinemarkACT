import mongoose from "mongoose";   
import dotenv from "dotenv";
import {config} from "../backend/src/config.js";

dotenv.config();
const URI = config.db.URI;

mongoose.connect(URI);

const connection = mongoose.connection;



// Veo si funciona
connection.once("open", () => {
  console.log("DB is connected");
});

// Veo si se desconectó
connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

// Veo si hay un error
connection.on("error", (error) => {
  console.log("error found" + error);
});