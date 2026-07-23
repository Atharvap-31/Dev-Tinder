const express  = require('express')
const { userAuth } = require('../middlewares/auth')

const requestRouter = express.Router()
// sent friend request
requestRouter.post('/sentRequest',userAuth, async (req,res) => {
try {
  res.send('Connection req send')
  
} catch (error) {
  res.status(400).send(user)
  
}
  console.log('send request');
  
})


module.exports = requestRouter