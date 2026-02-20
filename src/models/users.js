const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  age: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
