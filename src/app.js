const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/users");

// middleware for handling json format to js object
app.use(express.json());


// update the user by id


app.patch('/user',async (req,res)=>{
  const userId = req.body._id
  const data = req.body
  try {
    const user = await User.findByIdAndUpdate(userId,data)
    res.send('user successfully updated')
  } catch (error) {
    res.status(400).send('user cannot be updated')
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

app.post('/signup',async(req,res) => {
console.log(req.body);
  

  const user = new User(req.body)

  try {
    await user.save()
    res.send('User signedup successfully')
  } catch (error) {
    res.status(400).send("Error signing up user : " + error.message)
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
