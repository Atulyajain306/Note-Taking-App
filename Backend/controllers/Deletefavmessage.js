import Message from "../models/Message.js";
import Audio from "../models/Audio.js"
const Deletefavmessage = async(req,res) => {
        try{
              const {_id}=req.body;
              const user=await Message.findByIdAndUpdate(_id,{favoutite:false});
              const u=await Audio.findByIdAndUpdate(_id,{favoutite:false});
             return res.status(200).json({success:"favourite removed succesfully"})
        }
        catch(error)
        {
            console.log(error)
        }
}

export default Deletefavmessage