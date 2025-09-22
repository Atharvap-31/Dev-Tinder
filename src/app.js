const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log(req.query);
    // next();
    res.send({
      firstName: "Atharva",
      lastName: "Patil",
    });
  },
  (req, res) => {
    res.send("2 Route Handler");
  }
);

app.post("/user/aa", (req, res) => {
  console.log("POST API called");
  res.send("POST API");
});

app.put("/user", (req, res) => {
  res.send("PUT API");
  console.log("POST APII called Succesfully");
});

app.delete("/user", (req, res) => {
  console.log("DELETE API CALLED");
});

app.listen(5000);
