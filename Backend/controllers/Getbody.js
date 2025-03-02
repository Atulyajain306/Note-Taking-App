import Message from "../models/Message.js";
import Audio from "../models/Audio.js"
const Getbody = async(req,res) => {
      try
      {
          const {id,mess}=req.body;
          let user=await Message.findByIdAndUpdate(id,{message:mess},{new:true});
          let u=await Audio.findByIdAndUpdate(id,{message:mess},{new:true});
          if(!user){
            return res.status(200).json(u);
          }else{
           return res.status(200).json(user); 
          }
      }
      catch(error)
      {
        console.log(error)
      }
}

export default Getbody