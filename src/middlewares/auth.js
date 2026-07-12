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
    throw new Error("Token not Found");
  }

  // verify the token
  const decodeToken = await jwt.verify(token,'Patiltab123')
  const {_id} = decodeToken

  // validate the user
  const user = await User.findById(_id)
  if(!user){
    throw new Error("User not founf");
    
  }
  
  req.user = user;
  next()

} catch (error) {
  throw new Error("Error"+error.message);
  
}
}

module.exports = {
  adminAuth,
  userAuth
};
