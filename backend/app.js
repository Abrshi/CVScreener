const express = require("express");
const appRoute = require("./routes/appRouter");
const path = require("path");
const app = express();

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json({}));

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello form the server" });
});

app.use("/api/applications", appRoute);

module.exports = app;
