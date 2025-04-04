import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const Handlenewbody = () => {
     const {setsingleMessage,savedmessages,setsavedmessages,setupdated,setProfilepic,setauthUser}=useAuthContext();
    const handlebody=async(id,mess)=>{
         try
         {
            let res=await fetch("https://note-taking-app-8825.onrender.com/newbody",{
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
    return {handlebody}
}

export default Handlenewbody