const User = require('../models/users');
const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = "abcd";
  const isAdminAuthorized = token === "abcd";

  if (!isAdminAuthorized) {
    res.status(401).send("Admin not authorized");
  } else {
    next();
  }
};

const userAuth = async(req,res,next)=>{
try {
  const {token} = req.cookies
  if(!token) {
    return res.status(401).json({
        message: "Please log in."
      });
  }

  // verify the token
  const decodeToken = await jwt.verify(token,'Patiltab123')
  const {_id} = decodeToken

  // validate the user
  const user = await User.findById(_id)
  if(!user){
    throw new Error("User not founf");
    
  }
  // if user logged in successfully
  req.user = user;
  next()

} catch (error) {
  res.status(400).json({
    message:'Invalid Token or Token not found'
  })
  
}
}

module.exports = {
  adminAuth,
  userAuth
};
