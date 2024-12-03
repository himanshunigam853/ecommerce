const User=require('../models/usermodels');

// Signup Api
const signupUser=async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        // Create a new user
        const user= new User({
            username,
            email,
            password
        });
        await user.save();
        return res.status(201).json({message:'User Signup successfull!',user:user})
    }catch(error){
            console.error('Error');
            res.status(500).json({message:'Internal Server Error'});
    }
};


// Login API
const loginUser=async (req,res)=>{
    try {
        const{email,password}=req.body;
        // check if the user exits
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:'User Not Found'})
        }
        //    db password | jo send kar rhe
        if(user.password!==password){
            return res.status(404).json({message:'Invalid crendtial'});
        }
        return res.status(200).json({message:'user Login successfull!',user})
    } catch (error) {
        console.log('error during login',error);
        res.status(500).json({message:"Internal server error!"});
    }
};


module.exports={signupUser,loginUser};