const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/users");
const {validateSignUpApi} = require('./utils/validation')
const bcrypt = require('bcrypt');
const validator = require('validator')


// middleware for handling json format to js object
app.use(express.json());


app.post('/signup',async(req,res) => {
  
  try {
    // validate the user
    validateSignUpApi(req)

  const {firstName,lastName,emailId,password} = req.body
  
  // encrypt the password
  const hashPassword = await bcrypt.hash(password,10)
  console.log(hashPassword);
  
  const user = new User({firstName,lastName,emailId, password:hashPassword})
    await user.save()
    res.send('User signedup successfully')
  } catch (error) {
    res.status(400).send("Error signing up user : " + error.message)
  }
})

app.post('/login',async(req,res) => {
  try {
   const {emailId,password} = req.body
    // if email id format is correct or not
   if(!validator.isEmail(emailId)){
    throw new Error("Invalid Email id format");
  }

    // if email id and password are in our db
    const user = await User.findOne({emailId:emailId})
    console.log(user);
    
    if(!user){
      throw new Error("INVALID CREDENTIALS");
      
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    // if correct login successfull
    if(passwordValid){
      res.status(200).send('LOGIN SUCCESSFULL')
    }else{
       throw new Error("INVALID CREDENTIALS");

    }
    
  } catch (error) {
    res.status(400).send('ERROR :', + error.message)
  }
})

// update the user by id


app.patch('/user/:_id',async (req,res)=>{
  const userId = req.params?._id
  const data = req.body
  
  try {
    const ALLOWED_UPDATES = ["age","password","skills","gender"]

    const allowedData = Object.keys(data).every((d) => ALLOWED_UPDATES.includes(d))
    if(!allowedData){
      throw new Error("Data not allowed to be updated");
    }

    if(data?.skills?.length > 5){
      throw new Error('Skills limit exceded')
    }

    const user = await User.findByIdAndUpdate(userId,data,{
      returnDocument:'after',
      runValidators:true}
    )
    res.send('user successfully updated')
  } catch (error) {
    res.status(400).send('updatefailed:'+ error.message)
  }

})

// delete user

app.delete('/user', async (req,res)=>{

  const userId = req.body._id
  
  try {
    const user = await User.findByIdAndDelete(userId)
    await res.send('User deleted succefully')    

    
  } catch (error) {
    res.status(400).send('User cannot be deleted')
  }
})

// get user by email

app.get('/user', async(req,res) => {
  const userEmailId  = req.body.emailId;

  const user = await User.find({emailId : userEmailId})

  try {
    if(user.length === 0 ){
      res.status(404).send('Invalid Request')
    }else{
      await res.send(user)

    }
  } catch (error) {
    res.status(400).send('Email not found')
  }

})

// get all users for the feed

app.get('/feed',async(req,res)=>{
  
  try {
    const users = await User.find({}) // passing empty object gives me all the user data from the database
    await res.send(users)
  } catch (error) {
    res.status(400).send('user not found')
  }
})



//first connect to the database and then start or listen to the server
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(5000, () => {
      console.log("Listening to the port 5000 successfully");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
