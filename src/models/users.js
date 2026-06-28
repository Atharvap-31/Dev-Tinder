const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');

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
    trim:true,
    validate(value) {
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email");
        
      }
    }
  },
  password: {
    type: String,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Password must be strong");
        
      }
    }
  },
  contactNo: {
    type: Number
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
  },
  skills:[String]
},{
  timestamps:true
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
