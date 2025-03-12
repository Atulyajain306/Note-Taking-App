import User from "../models/User.js"

const Getpic = async(req,res) => {
      try{
       
        let u=await User.findById(req.user.userId,{new:true});
          let pic=u.Profilepic;
        res.status(200).json(pic);
      }
      catch(error)
      {res.status(200).json({error:"error"})}
}

export default Getpic