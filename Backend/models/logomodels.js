const { request } = require('express');
const mongoose = require('mongoose')

const logoSchema = new mongoose.Schema({
    logoName:{
        type:String,
        required:true,
    },
    logoImage:{
        type:String,
    
    }
});

const Logo = mongoose.model('Logo', logoSchema)
module.exports = Logo;
