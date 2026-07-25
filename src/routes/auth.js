const express = require("express");
const { validateSignUpApi } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/users");
const authRouter  = express.Router()
const validator = require('validator')

authRouter.post('/signup',async(req,res) => {
  
  try {
    // validate the user
    validateSignUpApi(req)

  const {firstName,lastName,emailId,password} = req.body
  
  // encrypt the password
  const hashPassword = await bcrypt.hash(password,10)
  
  const user = new User({firstName,lastName,emailId, password:hashPassword})
    await user.save()
    res.send('User signedup successfully')
  } catch (error) {
    res.status(400).send("Error signing up user : " + error.message)
  }
})

authRouter.post('/login',async(req,res) => {
  try {
   const {emailId,password} = req.body
    // if email id format is correct or not
    console.log(emailId,password);
    
    
   if(!validator.isEmail(emailId)){
    throw new Error("Invalid Email id format");
  }

    // if email id and password are in our db
    const user = await User.findOne({emailId:emailId})
    
    if(!user){
      throw new Error("INVALID CREDENTIALS");
      
    }

    const passwordValid = await user.validatePassword(password)
    console.log(passwordValid);
    

    // if correct then login successfull
    if(passwordValid){
      const token  = await user.getJwt()
      
      res.cookie('token', token);
      res.status(200).send('LOGIN SUCCESSFULL')
    }else{
       throw new Error("INVALID CREDENTIALS");

    }
    
  } catch (error) {
    res.status(400).send('ERROR :', + error.message)
  }
})

authRouter.post('/logout',async (req,res) => {

    res.cookie('token', null 
    ).json({message :'User Logged out successfully'})

})

module.exports = authRouter