import bcryptjs from "bcryptjs"
import User from '../models/User.js';
import { generatetokenandcookie } from '../utils/webtoken.js';
const Login = async(req,res) => {
      try{
        let {username,password}=req.body;
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error:"Username Doesn't Exist"});
        }
        let isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid Password"});
        }
          generatetokenandcookie(user._id,res);
          
       return res.status(201).json({
          username:user.username,
          email:user.email,
          id:user._id,
          gender:user.gender,
        });
      }catch(error){
        console.log(error.message);
      }
 
}

export default Login