const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require('cookie-parser');
const { userAuth } = require("./middlewares/auth");

// middleware for handling json format to js object
app.use(express.json());
app.use(cookieParser());



// get profile of the user

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)

//first connect to the database and then start or listen to the server
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Listening to the port 5000 successfully");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
