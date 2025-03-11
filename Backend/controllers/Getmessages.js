import Audio from "../models/Audio.js";
import Message from "../models/Message.js";
const Getmessages = async(req,res) => {
      try{
        const messages = await Message.find({userId:req.user.userId});
        const audio= await Audio.find({userId:req.user.userId}); 
        const mess=[...messages,...audio];
        res.status(200).json(mess);
      }catch(error)
      {
        res.status(200).json({error:"error"})
      }
      

}

export default Getmessages