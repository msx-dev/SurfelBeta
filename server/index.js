const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pinsRoute = require("./routes/pins");
const usersRoute = require("./routes/users");
require('dotenv').config();

//Middleware
app.use(express.json()); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(process.env.MONGO_CONN).then(()=> {
    console.log("Successfully connected to the DB!");
}).catch(error => {
    console.log(error);
});

app.use("/api/pins", pinsRoute);

app.use("/api/users", usersRoute);

app.listen(5001, () => {
    console.log("Server running on port 5001!");
})