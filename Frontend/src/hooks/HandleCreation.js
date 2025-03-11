import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";
import { useState } from "react";
const HandleCreation = () => {
    const {savedmessages,setsavedmessages}=useAuthContext();
    const [Loading,setLoading]=useState(false);

  const Notecreation=async(message)=>{
      try{
            if(!message || message.trim()==="" || message===undefined ){
              throw new Error("Message is empty");
            }
            setLoading(true);
           const res=await fetch("https://note-taking-app-8825.onrender.com/rew/note",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({message}),
            credentials: "include"  
           }); 
          const data=await res.json();
          
          if(data.error){ 
            throw new Error(data.error)   
          }
            setsavedmessages([...savedmessages,data.data])
            console.log(savedmessages)
          toast.success("Note Added");

      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
  }
  return {Notecreation,Loading}
}

export default HandleCreation