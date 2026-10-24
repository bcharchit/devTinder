const express = require("express");
const dbConnect = require("./config/database")
const app = express();
const User = require("./models/user")


app.use(express.json());
app.post("/signup", async(req, res) => {

    //creating a new user instance using the User model and the userObj data
    const user = new User(req.body);
    try{
     await user.save();
     res.status(200).send("user saved successfully")
    }catch(err){
        res.status(500).send("error while saving user")
    }
   

    

})

dbConnect().then(() => {
    console.log("db connection successfull")
    app.listen(3000, () => { console.log("server is listening successfully") })
}).catch((err) => {
    console.log("database connection failed")
})


