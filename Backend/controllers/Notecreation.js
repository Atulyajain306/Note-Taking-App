import Message from "../models/Message.js";
const Notecreation = async(req,res) => {
    try{
       const {message,title}=req.body;
           
       if(!message){
         return res.status(400).json({error:"Message is Required"});
       }
        const newMessage= new Message({
            message,
            title,
            userId:req.user.userId
        });
        await newMessage.save(); 
        res.status(201).json({card:"Added Succesfully",data:newMessage});
    }catch(error){
       console.log(error.message); 
    }
}

export default Notecreation