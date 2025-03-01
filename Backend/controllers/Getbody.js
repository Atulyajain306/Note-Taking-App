import Message from "../models/Message.js";

const Getbody = async(req,res) => {
      try
      {
          const {id,mess}=req.body;
          let user=await Message.findByIdAndUpdate(id,{message:mess},{new:true});
            res.status(200).json(user); 
      }
      catch(error)
      {
        console.log(error)
      }
}

export default Getbody