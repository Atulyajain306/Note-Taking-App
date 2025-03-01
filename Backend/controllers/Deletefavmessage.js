import Message from "../models/Message.js";


const Deletefavmessage = async(req,res) => {
        try{
              const {_id}=req.body;
              const user=await Message.findByIdAndUpdate(_id,{favoutite:false});
              res.status(200).json({success:"favourite removed succesfully"})
        }
        catch(error)
        {
            console.log(error)
        }
}

export default Deletefavmessage