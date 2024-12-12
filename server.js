import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
dotenv.config();

//calling the db funciton
connectDb();

// creating app
const app = express();
app.use(cors());
app.use(express.json());
// app.use("/api/v1/auth",staffRoute)
//subscription routes
app.use("/uploads", express.static("uploads"));
//subscription routes 
app.use("/uploads", express.static("uploads"));


// Catch-all route to serve the React app for all non-API routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.PORT, async () => {
  console.log(
    `Server is Running on port ${process.env.PORT} in ${process.env.DEV_MODE} mode`
  );
});
