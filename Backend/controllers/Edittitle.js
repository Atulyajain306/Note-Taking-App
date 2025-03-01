import Message from "../models/Message.js";

const Edittitle = async(req,res) => {
       try
       {
             const {popuptitle,id}=req.body;
             const user= await Message.findByIdAndUpdate(id,{title:popuptitle},{new:true});
             res.status(200).json(user);
       }
       catch(error)
       {
        console.log(error)

       }
}

export default Edittitle