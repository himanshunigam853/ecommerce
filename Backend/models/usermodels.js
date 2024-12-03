const { request } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

// create a User Modal
const User=mongoose.model('User',userSchema);
module.exports=User;