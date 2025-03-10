import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";
const Handlenewbody = () => {
     const {setsingleMessage,savedmessages,setsavedmessages,updated,setupdated}=useAuthContext();
    const handlebody=async(id,mess)=>{
         try
         {
            let res=await fetch("https://note-taking-app-backend-sooty.vercel.app/api/newbody",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id,mess}),
                credentials: "include" 
            });
            let data= await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            const filtermessage = savedmessages.map((msg) => {
                if (msg._id === id) {
                    setupdated( new Date().toISOString()); 
                    return { ...msg, message: data.message,updatedAt: new Date().toISOString() };
                }
                return msg;
            });            
               setsavedmessages(filtermessage);
              setsingleMessage((prev)=>({...prev,message:data.message}))
            toast.success("Message Saved Successfully")
         }
         catch(error)
         {
            console.log(error)
         }
    }
    return {handlebody}
}

export default Handlenewbody