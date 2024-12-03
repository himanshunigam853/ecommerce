const express = require('express');
const {savecategory}=require('../controllers/categoryController')
const {getCategoies}=require('../controllers/categoryController')
const {deleteCategories}=require('../controllers/categoryController')



const router=express.Router();
// Signup Route
router.post('/save',savecategory);

// get route
router.get('/getcategory',getCategoies)

//del route
router.delete('/delcategory/:id',deleteCategories)

module.exports=router