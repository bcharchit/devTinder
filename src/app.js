const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user")


app.use(express.json());
app.post("/signup", async (req, res) => {

    //creating a new user instance using the User model and the userObj data
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).send("user saved successfully")
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
app.patch("/user", async (req, res) => {
    const userID = req.body.userId;
    const data = req.body
    try {
        const user = await User.findByIdAndUpdate({ _id: userID }, data, { returnDocument: 'before',runValidators:true })
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
dbConnect().then(() => {
    console.log("db connection successfull")
    app.listen(3000, () => { console.log("server is listening successfully") })
}).catch((err) => {
    console.log("database connection failed")
})


