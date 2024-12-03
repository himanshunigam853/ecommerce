const { request } = require('express');
const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    
    slidername:{
        type: String,
        required:true,
    },
    sliderImage:{
        type:String,
    }
});

// create a User Modal
const Slider=mongoose.model('Slider',sliderSchema);

module.exports=Slider;

