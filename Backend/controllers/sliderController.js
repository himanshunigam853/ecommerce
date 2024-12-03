const Slider=require('../models/slidermodels');

// save api
const saveSlider=async(req,res)=>{
    try {
        const {slidername}=req.body;
        const sliderImage=req.file ? req.file.filename : null;
        // if(!slidername || !sliderImage){
        //     return res.status(400).json({message:'slider name and image are required'});
        // }
        const slider=new Slider({slidername,sliderImage});
        await slider.save();
        res.status(201).json({message:'slider save success',slider});
    } catch (error) {
        console.error("Error saving slider");
        res.status(500).json({message:"Internal serval error"});
    }
};

// get api
 const getSliders=async(req,res)=>{
    try {
        const sliders=await Slider.find();
        res.status(200).json({message:'Slider fetched successfully',sliders})
    } catch (error) {
        console.error("Error saving slider");
        res.status(500).json({message:"Internal serval error"});
    }
 }

// delete api
const deleteSlider=async(req,res)=>{
    try {
        const {id} = req.params
        const del = await Slider.findByIdAndDelete(id);
        res.status(200).json({message:'Slider deleted',del});
    } catch (error) {
        res.status(200).json({message:'Slider Not deleted'});
    }
}


 module.exports={saveSlider,getSliders,deleteSlider};

