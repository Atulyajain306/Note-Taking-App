import mongoose from "mongoose"
const audio= new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
   isAudio:{
      type:Boolean,
      default:true
   }, 
message:{
    type:String,
    required:true
    },
title:{
    type:String,
    default:"Engineering Assignment Audio"
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
 const Audio=mongoose.model("Audio",audio);
export default Audio