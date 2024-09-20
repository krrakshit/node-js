const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: false,
    },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    jobtitle:{
        type:String,
    },
    gender:{
        type: String,
    }
})

const User = mongoose.model("user",userschema)
module.exports = User