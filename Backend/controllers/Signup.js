import User from "../models/User.js"
import bcryptjs from "bcryptjs"
const Signup=async(req,res)=>{ 
     try{
        let {username,gender,password,confirmpassword,email}=req.body
        if(password !==confirmpassword){
            return res.status(400).json({error:"Password and Confirmpassword does not match"})
          }
        const user= await User.findOne({username});
         if(user){
            return res.status(400).json({error:"Username already exists"})
         }  
         const slt=await bcryptjs.genSalt(10);
         const hashPassword=await bcryptjs.hash(password,slt);
         const newUser= new User({
            username,
            gender,
            email,
            password:hashPassword,
         })
         await newUser.save();
      res.status(201).json({message:"User created Succesfully"});
          

     }catch(error){
        console.log(error.message)
     }
}

export default Signup