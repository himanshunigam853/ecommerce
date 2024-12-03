const express = require('express');
const multer=require('multer');
const path=require('path');
const { saveSlider, getSliders,deleteSlider } = require('../controllers/sliderController');



// configure multer for file uploads
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        // cb(null,'uploads/')
        cb(null,path.join(__dirname,"../uploads"));

    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    },
});


const upload =multer({storage});

const router = express.Router();
// save slider
router.post('/save',upload.single('sliderImage'),saveSlider);
//get route
router.get('/getsliders',getSliders)
//delete route
router.delete('/delslider/:id',deleteSlider)

module.exports=router;