import Message from "../models/Message.js";
const Editmessages = async(req,res) => {
      try{
            const {newtitle,_id}=req.body;
           let update= await Message.findByIdAndUpdate(_id,{title:newtitle});
           res.status(200).json({success:"Editted Succesfully"}) 
      }
      catch(error)
      {
        console.log(error);
      }
}

export default Editmessages