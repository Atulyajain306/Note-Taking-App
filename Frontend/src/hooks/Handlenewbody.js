import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";
const Handlenewbody = () => {
     const {setsingleMessage,savedmessages,setsavedmessages}=useAuthContext();
    const handlebody=async(id,mess)=>{
         try
         {
               
            let res=await fetch("/api/newbody",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id,mess})
            });
            let data= await res.json();
            if(data.error){
                throw new Error(data.error)
            }
               const filtermessage=savedmessages.map((msg)=>(
                msg._id=== id ? {...msg ,message:data.message } : msg
               ))
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