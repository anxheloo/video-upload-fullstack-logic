const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { readdirsync } = require("fs");
const videoRoutes = require("./routes/video");
const path = require("path");

const PORT = process.env.PORT || 9000;

//Middlewares

// Add this line to parse JSON bodies
app.use(express.json());
app.use(cors());

//Routes

app.use("/api", videoRoutes);

// app.use("/public");

// serve static files in order for frontend to load content from backend
app.use("/public", express.static(path.join(__dirname, "public")));

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB CONNECTED"))
    .catch((error) => console.log("THIS IS ERROR:", error));
  // .catch((error) => throw error);
};

app.listen(PORT, () => {
  connect();
  console.log("CONNCETED & Listening on port: ", PORT);
});
