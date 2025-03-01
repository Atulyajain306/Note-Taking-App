import mongoose from "mongoose";
const user= new mongoose.Schema({
   username:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
     type:String,
     required:true
   },
  gender:{
    type:String,
    required:true
  },
  Profilepic:{
    type:String,
  }
},{
  timestamps:true
});

const User=mongoose.model("User",user);
export default User;