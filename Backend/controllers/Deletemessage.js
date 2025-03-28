import Message from "../models/Message.js";
import Audio from "../models/Audio.js"
const Deletemessage = async(req,res) => {
      try{
           const {id}=req.body;
           if(!id){
              return res.status(200).json({id:"Id not Found"});
           }
          let user=await Message.findByIdAndDelete({_id:id});
          let u= await Audio.findByIdAndDelete({_id:id});
          if(!user || !u){
            return res.status(200).json({message:"Message didnt Delete"});
          }

          return res.status(200).json({success:"Message Deleted"});
      }catch(error)
      {
        res.status(200).json({error:"error"})
      }
}

export default Deletemessage