const express = require('express');
const app=express();
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const cors=require("cors");
const path=require('path');
// const fs=require('fs');

//  Middleware for parsing json
app.use(express.json());

// serve static files from 'uploads' folder
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// serve static files from 'logouploads' folder
// app.use('/logouploads',express.static(path.join(__dirname,'logouploads'))); 


// Load environment var from .env files
dotenv.config();

// connect to the database
connectDB();


app.use(cors());



// (after)  Define routes
const userRoutes=require('./routes/userRoutes');
app.use('/user',userRoutes);

// (after)  Define routes
const categoryRoutes=require('./routes/categoryRoutes');
app.use('/category',categoryRoutes);


const sliderRoutes=require('./routes/sliderRoutes');
app.use('/slider',sliderRoutes);

const logoRoutes=require('./routes/logoRoutes');
app.use('/logo',logoRoutes);


// sample route to test the api
app.get('/',(req,res)=>{
    res.send('Api is running');
});


// Define th Port
const PORT = process.env.PORT || 5000;


// start the server
app.listen(PORT,()=>{
    console.log(`server is running on port :${PORT}`);
})