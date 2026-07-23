const express = require('express')
const { userAuth } = require('../middlewares/auth')

const profileRouter = express.Router()
profileRouter.get('/profile',userAuth, async(req,res) =>{

  try {

    const user = req.user
  
    res.send(user)
    

  } catch (error) {
    res.status(400).send('Invalid Token')
  }
  

  res.status(200).send('Cookie send successfully')
})

module.exports = profileRouter