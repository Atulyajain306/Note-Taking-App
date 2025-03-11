import Message from "../models/Message.js";
import Audio from "../models/Audio.js"
const Edittitle = async(req,res) => {
       try
       {
             const {popuptitle,id}=req.body;
             const user= await Message.findByIdAndUpdate(id,{title:popuptitle},{new:true});
             const u= await Audio.findByIdAndUpdate(id,{title:popuptitle},{new:true});
             if(!user){
             return res.status(200).json(u);
             }
             return res.status(200).json(user);
       }
       catch(error)
       {
            res.status(200).json({error:"error"})

       }
}

export default Edittitle