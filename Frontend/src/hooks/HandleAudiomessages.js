import { useAuthContext } from "../context/Auth";
import toast from "react-hot-toast"
const HandleAudiomessages = () => {
    const {savedmessages,setsavedmessages}=useAuthContext();
     const Audiomessage=async(transcript)=>{
           try{
                 const res= await fetch("https://note-taking-app-eight-sigma.vercel.app/api/audiomessage",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({transcript}),
                    credentials: "include" 
                 });
                let data=await res.json();  
               if(data.error){
                throw new Error(data.error);
               }
                 setsavedmessages([...savedmessages,data.data]);
            toast.success("Audio Note Added");
           }catch(error)
           {
            console.log(error)
           }
     }
     return {Audiomessage}
}

export default HandleAudiomessages