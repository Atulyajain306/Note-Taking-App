import express from "express";
import dotenv from "dotenv"
import multer from "multer";
import path from "path";
import cors from "cors"
import dbconnection from "../Backend/db/db.js";
import  Signup from "./controllers/Signup.js";
import cookieParser from "cookie-parser";
import Login from "./controllers/Login.js";
import Logout from "./controllers/Logout.js";
import useroutes from "./routes/useroutes.js"
import protectroute from "./middleware/protectroute.js";
import Getmessages from "./controllers/Getmessages.js";
import Deletemessage from "./controllers/Deletemessage.js";
import GetAudioMessage from "./controllers/GetAudioMessage.js";
import Editmessages from "./controllers/Editmessages.js"
import favouriteroutes from "./routes/favouriteroutes.js"
import Message from "./models/Message.js";
import Getbody from "./controllers/Getbody.js";
import Edittitle from "./controllers/Edittitle.js";
import Getpic from "./controllers/Getpic.js";
import User from "./models/User.js";
import Audio from "./models/Audio.js";
import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();
const app=express()
const __dirname=path.resolve();
const frontendPath = path.join(__dirname, "../Frontend/dist");
app.use(cors({
    origin: "https://note-taking-app-8825.onrender.com",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"));
app.use(cookieParser());
app.use("/rew",useroutes)
app.use("/favourite",favouriteroutes)
app.post("/auth",Signup)
app.post("/log",Login)
app.post("/logout",Logout)
app.get("/getpic",protectroute,Getpic)
app.get("/info",protectroute,Getmessages)
app.post("/audiomessage",protectroute,GetAudioMessage)
app.post("/newbody",protectroute,Getbody)
app.post("/newtitle",protectroute,Edittitle)
app.post("/delete",protectroute,Deletemessage)
app.post("/edit",protectroute,Editmessages)
const PORT=process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: "uploads",
        format: file.mimetype.split("/")[1], // Keeps original format
        public_id: file.originalname.split(".")[0],
    }),
});
const upload=multer({storage});
app.post("/upload/:id",upload.single("image"),async function(req,res){
         const {id}=req.params;
         const user=await Message.findByIdAndUpdate(id,{ImageURL:req.file.path || req.file.url},{new:true});
         const u=await Audio.findByIdAndUpdate(id,{ImageURL:req.file.path || req.file.url},{new:true});
          console.log(user); 
          if(!user){
            return res.status(200).json(u.ImageURL);
          }
          else{
      return res.status(200).json(user.ImageURL);
        }
    });

app.post("/upload/profilepic/:id",upload.single("Profile"),async function(req,res){
    const {id}=req.params;
    const user=await User.findByIdAndUpdate(id,{Profilepic:req.file.path || req.file.url},{new:true});
    console.log(user);
    return res.status(200).json({Profilepic:user.Profilepic});
});    

app.get("/cards",protectroute,async(req,res)=>{
        try
         {
             const cards=await Message.find({userId:req.user.userId});
             const www=await Audio.find({userId:req.user.userId});
             let qqq=[...cards,...www]
             res.json(qqq);
         }
         catch(error)
         {
            console.log(error)
         }
   });  

app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
app.listen(PORT,()=>{
    dbconnection();
    console.log("server is running on 3000")
})