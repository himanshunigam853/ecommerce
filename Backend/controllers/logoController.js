const Logo = require('../models/logomodels')

const saveLogo=async(req,res)=>{
    try {
        const {logoName}=req.body;
        const logoImage=req.file ? req.file.filename : null;
   
        const logo=new Logo({
            logoName,
            logoImage,
        });
        await logo.save();
        res.status(201).json({message:'slider save success',logo});
    } catch (error) {
        console.error("Error saving slider");
        res.status(500).json({message:"Internal serval error"});
    }
};

// get category api
const getLogo=async(req,res)=>{
    try {
        const logo=await Logo.find();
        res.status(200).json({message:'Categories fetched success',logo});
    } catch (error) {
        console.error("Error saving slider");
        res.status(500).json({message:"Internal serval error"});
    }
};

// delete api
const deleteLogo=async(req,res)=>{
    try {
        const {id}=req.params
        const logodel=await Logo.findByIdAndDelete(id)
        res.status(201).json({message:'Logo Delete Successfully!',logodel})
    } catch (error) {
        res.status(500).json({message:'Logo Not Delete',error})
    }
}

module.exports={saveLogo,getLogo,deleteLogo};
