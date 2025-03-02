import Message from "../models/Message.js";
import Audio from "../models/Audio.js"
const Editmessages = async(req,res) => {
      try{
            const {newtitle,_id}=req.body;
           let update= await Message.findByIdAndUpdate(_id,{title:newtitle});
           let u= await Audio.findByIdAndUpdate(_id,{title:newtitle});
          return res.status(200).json({success:"Editted Succesfully"}) 
      }
      catch(error)
      {
        console.log(error);
      }
}

export default Editmessages