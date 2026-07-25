const express = require('express')
const { userAuth } = require('../middlewares/auth')
const { validateProfileEdit} = require("../utils/validation")

const profileRouter = express.Router()
profileRouter.get('/profile/view',userAuth, async(req,res) =>{

  try {
    const user = req.user
    if(!user){
      throw new Error("User not found");
      
    }
    res.send(user)
    
  } catch (error) {
    res.status(400).send(error.message)
  }
  

  res.status(200).send('Cookie send successfully')
})

// edit profile

profileRouter.patch('/profile/edit',userAuth,async (req,res) => {
console.log('user');

  try {
    validateProfileEdit(req);

    const logggedInUser  = req.user;
    
    Object.keys(req.body).forEach((key) => logggedInUser[key] = req.body[key])
    await logggedInUser.save();  

   res.status(200).json({
      message: "Profile updated successfully",
      data: logggedInUser
});

  } catch (error) {
    res.status(400).json({
      message: "Profile update failed",
      error: error.message,
  });

  }
  

})

module.exports = profileRouter