require('dotenv').config()
const express = require("express");
const route = require("./route/route");

const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));


app.use("/", route);


app.listen(3000, function () {
  console.log("Express App is running on port " + 3000);
});