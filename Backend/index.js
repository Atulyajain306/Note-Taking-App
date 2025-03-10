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
dotenv.config();
const app=express()
app.use(cors({
    origin: ["https://note-taking-app-frontend-jet.vercel.app"],  
    methods: ["GET","POST" ,"PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
 }));
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"));
app.use(cookieParser());
app.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://note-taking-app-frontend-jet.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.sendStatus(204);
});
app.use("/api/rew",useroutes)
app.use("/api/favourite",favouriteroutes)
app.post("/api/auth",Signup)
app.post("/api/log",Login)
app.post("/api/logout",Logout)
app.get("/api/getpic",protectroute,Getpic)
app.get("/api/info",protectroute,Getmessages)
app.post("/api/audiomessage",protectroute,GetAudioMessage)
app.post("/api/newbody",protectroute,Getbody)
app.post("/api/newtitle",protectroute,Edittitle)
app.post("/api/delete",protectroute,Deletemessage)
app.post("/api/edit",protectroute,Editmessages)
const PORT=process.env.PORT;
const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"./uploads");
    },
    filename:(req,file,cd)=>{
        cd(null, file.originalname );
    }
});
const upload=multer({storage:storage});
app.post("/api/upload/:id",upload.single("image"),async function(req,res){
         const {id}=req.params;
         const user=await Message.findByIdAndUpdate(id,{ImageURL:`/uploads/${req.file.filename}`},{new:true});
         const u=await Audio.findByIdAndUpdate(id,{ImageURL:`/uploads/${req.file.filename}`},{new:true});
          console.log(user); 
          if(!user){
            return res.status(200).json(u.ImageURL);
          }
          else{
      return res.status(200).json(user.ImageURL);
        }
    });

app.post("/api/upload/profilepic/:id",upload.single("Profile"),async function(req,res){
    const {id}=req.params;
    const user=await User.findByIdAndUpdate(id,{Profilepic:`/uploads/${req.file.filename}`},{new:true});
    console.log(user);
    return res.status(200).json({Profilepic:user.Profilepic});
});    

app.get("/api/cards", async(req,res)=>{
        try
         {
             const cards=await Message.find();
             const www=await Audio.find();
             let qqq=[...cards,...www]
             res.json(qqq);
         }
         catch(error)
         {
            console.log(error)
         }
   });  
app.get("/",(req,res)=>{
    res.send("Connection");
})
app.listen(PORT,()=>{
    dbconnection();
    console.log("server is running on 3000")
})