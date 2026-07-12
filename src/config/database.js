const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://patharva52_db_user:patiltab123@learning-nodejs.vdqimng.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Learning-NodeJss"
  );
};

module.exports = connectDB;
