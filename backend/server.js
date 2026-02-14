const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);


mongoose
  .connect(DB)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// console.log(process.env);
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
const server = app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
