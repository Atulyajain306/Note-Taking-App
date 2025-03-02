import Message from "../models/Message.js";
import Audio from "../models/Audio.js"
const Favouritemessage = async(req,res) => {
      try{
            const {_id}=req.body;
             const user=await Message.findByIdAndUpdate(_id,{favoutite:true});
             const u=await Audio.findByIdAndUpdate(_id,{favoutite:true});
             res.status(200).json({success:"favourite added succesfully"})
      }
      catch(error)
      {
        console.log(error);
      }
}

export default Favouritemessage