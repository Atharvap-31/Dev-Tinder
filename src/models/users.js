const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

// schema method to create jwt

userSchema.methods.getJwt =  function(){
const user  =this;

const token =  jwt.sign({_id:user._id},'Patiltab123',{expiresIn:'1d'})
return token
}

// schema to validate password

userSchema.methods.validatePassword  = async function (passwordInputByUser){
const user = this;

const passwordHash = user.password

const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
return isPasswordValid
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
