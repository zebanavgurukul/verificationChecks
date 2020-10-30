const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv/config')

// Database
mongoose.connect(process.env.DB_connect,{useNewUrlParser : true})
    .then(() => {
        console.log("Conncted to database.........")
    }).catch((err) => {
        console.log(err)
    });

// Middieware
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// controllers
const councilControl = require("./controllers/Routes");

// Routes
app.post("/api/create", councilControl.create);
app.get("/api/login/get", councilControl.get)
app.get("/verify", councilControl.getverify);;

// start server
const PORT = process.env.PORT;
app.listen(PORT,()=>{
 console.log(`Server Running on port ${PORT}`);
})