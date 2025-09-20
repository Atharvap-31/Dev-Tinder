const express = require("express");

const app = express();

app.use("/home", (req, res) => {
  res.send("From Home");
});

app.use("/dashboard", (req, res) => {
  res.send("From Dashbaord");
});

app.use("/", (req, res) => {
  res.send("hello");
});

app.listen(4000);
