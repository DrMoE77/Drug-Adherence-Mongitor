const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/user");
app = express()
//Listen On Server
app.listen(process.env.PORT ||3000,function (err) {
    if(err){
       console.log(err);
    }else {
    console.log("Server Started At Port 3000");  }});
    const mongoose = require("mongoose");
//In app.js
mongoose.connect("mongodb://localhost/auth_demo");
app.use(require("express-session")({
secret:"Any normal Word",//decode or encode session
    resave: false,          
    saveUninitialized:false    
}));
