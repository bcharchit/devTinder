const express = require("express");

const app = express()
app.get("/user", (req, res) => { res.send("hello from user") })

app.post("/user", (req, res) => { res.send("hello from post") })

app.delete("/user", (req, res) => { res.send("hello from delete") })

app.use("/user", (req, res) => { res.send("hello from server") })

app.listen(3000, () => { console.log("server is listening successfully") })