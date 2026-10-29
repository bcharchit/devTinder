const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt= require("bcrypt");    
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {


    try {
    validateSignupData(req);


    const {password,firstName,lastName,emailId}=req.body;
    const hashPassword= await bcrypt.hash(password,10);
    //creating a new user instance using the User model and the userObj data
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashPassword, 
    });
    
        await user.save();
        res.status(200).send("user saved successfully")
    } catch (err) {
        res.status(500).send(err.message)
    }




})

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId })
        if (!user) {
            throw new Error("Email ID not present in the database")
        }
        const ispasswordCorrect = await bcrypt.compare(password, user.password);
        if(ispasswordCorrect){
            const token=jwt.sign({_id:user._id},"Tinderdev@123",{expiresIn:"7d"})
              res.cookie("token",token,expireIn=2)
              res.send("login successful")
        }else{
            throw new Error("invalid password")
        }
      
    } catch (err) {
        res.status(500).send(err.message)
    }

})

app.get("/user", async (req, res) => {

    try {
        const user = await User.find({ emailId: req.body.emailId })
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send("error while fetching user")
    }

})

//delete user data
app.delete("/user", async (req, res) => {
    const userID = req.body.userId
    try {
        console.log("user id is", userID)
        const user = await User.findByIdAndDelete({ _id: userID })
        res.send("deleted successfully")
    } catch (err) {
        res.status(500).send("error while fetching user")
    }
})



// update data of the user
app.patch("/user/:userId", async (req, res) => {

try {
    
    const userID = req.params?.userId;
    const data = req.body;
   
    
    const allowedUpdates = ["age", "gender", "photoUrl", "about", "skills", "userId"]
    console.log("data is", data)
    const isUpdateAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k))
    if (!isUpdateAllowed) {
       throw new Error("invalid updates")
    }
    if(data?.skills.length>10){
        throw new Error("skills should be less than 10")
    }
        const user = await User.findByIdAndUpdate({ _id: userID }, data, { returnDocument: 'before', runValidators: true })
        res.send("user updated successfully")
    } catch (err) {
        res.status(500).send(err.message)
    }
})
//feed api 
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send("error while fetching feed")
    }
})

app.get("/profile", userAuth ,async (req, res) => {
    try {
       const user=req?.user;
        res.send(user,"validated user profile")
    } catch (err) {
        res.status(500).send("error while fetching feed")
    }
})



app.post("/sendConnectionRequest", userAuth ,async (req, res) => {
    try {
       const user=req?.user;
       res.send("validated user profile")
    } catch (err) {
        res.status(500).send("error while fetching feed")
    }
})
dbConnect().then(() => {
    console.log("db connection successfull")
    app.listen(3000, () => { console.log("server is listening successfully") })
}).catch((err) => {
    console.log("database connection failed")
})


