import mongoose from "mongoose";
const message=new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    isAudio:{
      type:Boolean,
      default:false
   }, 
     message:{
      type:String,
      required:true
    },
    title:{
      type:String,
      default:"Engineering Assignment Note"
    },
    favoutite:{
      type:Boolean,
      default:false
    },
    ImageURL:{
      type:String,
    }

},{
    timestamps:true
});

const Message=mongoose.model("Message",message);
export default Message