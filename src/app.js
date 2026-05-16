require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/documents", documentRoutes);

module.exports = app;
const matchRoutes = require("./routes/matchRoutes");
app.use("/match", matchRoutes);