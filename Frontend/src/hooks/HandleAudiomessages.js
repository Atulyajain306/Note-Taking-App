import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"
const HandleAudiomessages = () => {
    const {savedmessages,setsavedmessages,setProfilepic,setauthUser}=useAuthContext();
     const Audiomessage=async(transcript)=>{
           try{
                 const res= await fetch("https://note-taking-app-8825.onrender.com/audiomessage",{
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
            if(error.message==="Token not Assigned"){
                  localStorage.removeItem("item");
                  setauthUser(null);
                  setProfilepic(null);
                  toast.error("Session Expired Please Login again");
        
                }
                else{
                console.log(error);
                }
           }
     }
     return {Audiomessage}
}

export default HandleAudiomessages