const express = require('express');
const {signupUser}=require('../controllers/userController')
const {loginUser}=require('../controllers/userController')


const router=express.Router();
// Signup Route
router.post('/signup',signupUser);

// Login Route
router.post('/login',loginUser);

module.exports=router