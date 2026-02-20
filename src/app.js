const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/users");

app.use(express.json());

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  const user = await User.find({ emailId: userEmail });
  try {
    if (user.length === 0) {
      res.status(404).send("invalid request");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Email not found");
  }
});

// get all users for the feed

app.get("/feed", async (req, res) => {
  const allUsers = await User.find({});

  res.send(allUsers);
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user signed up successfully");
  } catch (error) {
    res.status(400).send("Error signing up user : " + error.message);
  }
});

//first connect to the database and then start or listen to the server
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(5000, () => {
      console.log("Listening to the port 5000 successfully");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
