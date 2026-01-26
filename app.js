const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
dotenv.config({ path: "./.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connection to the DB secured !!!");
  })
  .catch((e) => {
    console.log("Erorr: " + e);
  });
const port = 1122;
const app = express();
app.use(express.json());
app.use("users", userRoutes);

app.listen(port, () => {
  console.log("The server is running !!!");
});
