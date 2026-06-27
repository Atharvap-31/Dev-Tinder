const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
    required:true
  },
  emailId: {
    type: String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true
  },
  password: {
    type: String,
    required:true,
    unique:true
  },
  contactNo: {
    type: Number,
    required:true
  },
  age: {
    type: Number,
    min:18,
    max:50
  },
  gender:{
    type:String,
    validate(value){
      if(!['male','female','others'].includes(value)){
         throw new Error("invalid gender")
      }
    }
  }
},{
  timestamps:true
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
