const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const bookmarkRouter = require("./bookmark/bookmark.route");
const QuestionsRoute = require("./Questions/Questions.route");
const connect = require("./Config/config");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(express.json());
let PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
app.use("/questions", QuestionsRoute);
// app.use("/bookmark", bookmarkRouter);




app.listen(PORT, async () => {
  await connect();
  console.log("User heat the server!!");
});
