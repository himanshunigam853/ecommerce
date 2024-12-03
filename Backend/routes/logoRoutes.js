const express=require('express');
const multer=require('multer');
const path=require('path');
const { saveLogo, getLogo,deleteLogo } = require('../controllers/logoController');


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
router.post('/save',upload.single('logoImage'),saveLogo);
//get route
router.get('/getlogo',getLogo) 
// delete logo
router.delete('/delete/:id',deleteLogo)


module.exports=router;