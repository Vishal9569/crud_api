const mongoose = require("mongoose");

const User = new mongoose.Schema({
     id:{
        type: Number,
        required : true,
        unique : true
     },
     username:{
        type: String,
        required : true,
     },
     number:{
        type: Number,
        required : true,
        unique : true
     }
     
});

  
module.exports = mongoose.model("Userdb", User);