import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const HandleCreation = () => {
    const {savedmessages,setsavedmessages,setProfilepic,setauthUser}=useAuthContext();

  const Notecreation=async(message)=>{
      try{
            if(!message || message.trim()==="" || message===undefined ){
              throw new Error("Message is empty");
            }
            
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
  return {Notecreation}
}

export default HandleCreation