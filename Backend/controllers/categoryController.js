const Category=require('../models/Categorymodels');

// Signup Api
const savecategory=async(req,res)=>{
    try{
        const{categoryname}=req.body;
        // Create a new category
        const category= new Category({
            categoryname,
        });
        await category.save();
        return res.status(201).json({message:'Category Saved successfull!',category:category});
    }catch(error){
            console.error('Error');
            res.status(500).json({message:'Internal Server Error'});
    }
};


// get category api
const getCategoies=async(req,res)=>{
    try {
        const categories=await Category.find();
        res.status(200).json({message:'Categories fetched success',categories});
    } catch (error) {
        console.error("Error fetching data",error)
        res.status(500).json({message:"Internal server error"});
    }
};

// Delete  api
const deleteCategories=async(req,res)=>{
    try {
        const {id} = req.params
        const delcategories = await Category.findByIdAndDelete(id);
        res.status(200).json({message:'Categories Delete successfully!',delcategories});
    } catch (error) {
        console.error("Error fetching data",error)
        res.status(500).json({message:"category Not Delete"});
    }
}

module.exports={savecategory,getCategoies,deleteCategories};