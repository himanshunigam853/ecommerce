const { request } = require('express');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({ 
    categoryname:{
        type: String,
        required:true,
    },
});

// create a User Modal
const Category=mongoose.model('Category',categorySchema);
module.exports=Category;