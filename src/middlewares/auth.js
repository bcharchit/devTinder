const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {

    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("token not present in the cookies")
        }

        const decodedMessage = await jwt.verify(token, "Tinderdev@123");  //gives the message back the payload of the token
        const { _id } = decodedMessage;
        const user = await User.findById({ _id });
        console.log(user)
        if (!user) {
            throw new Error("user not present in the database")
        } 
            req.user = user;
            next();
        

    } catch (err) {
        res.status(400).send("ERROR" +err.message)
    }


}

module.exports = { userAuth };