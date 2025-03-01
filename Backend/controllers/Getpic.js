import User from "../models/User.js"

const Getpic = async(req,res) => {
      try{
       
        let u=await User.findById(req.user.userId);
          let pic=u.Profilepic;
        res.status(200).json(pic);
      }
      catch(error)
      {console.log(error)}
}

export default Getpic