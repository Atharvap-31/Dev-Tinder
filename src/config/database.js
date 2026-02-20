const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://patharva52_db_user:LK8TRelTLIEL4U3D@learning-nodejs.vdqimng.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Learning-NodeJss"
  );
};

module.exports = connectDB;
