const express = require("express");

const app = express()
app.get("/user/:userID", (req, res,next) => {
    console.log(req.params)
   res.send("hello from user")
   next();
}, (req, res) => {
    console.log(req.params)
    res.send("hello from 2 user")
}),

    app.post("/user", (req, res) => { res.send("hello from post") })

app.delete("/user", (req, res) => { res.send("hello from delete") })

app.use("/user", (req, res) => { res.send("hello from server") })

app.listen(3000, () => { console.log("server is listening successfully") })