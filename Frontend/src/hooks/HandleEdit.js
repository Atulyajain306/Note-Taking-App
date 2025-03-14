import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const HandleEdit = () => {
    const {savedmessages,setsavedmessages,setProfilepic,setauthUser}=useAuthContext();
  
    const handleEdit=async(newtitle,_id)=>{
         try{
              console.log("title",newtitle);
              if( !newtitle || newtitle.trim()==="" || newtitle === undefined){
                throw new Error("Title is either undefined or empty string")
              }  
              let res= await fetch("https://note-taking-app-8825.onrender.com/edit",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({newtitle,_id}),
                credentials: "include" 
              })
             let data= await res.json();
             if(data.error){
                throw new Error(data.error);
             }
             const updatedMessages = savedmessages.map((msg) =>
                msg._id === _id ? { ...msg, title: newtitle } : msg
            );
                setsavedmessages(updatedMessages);
             toast.success("Note Editted Successfully"); 
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
   return {handleEdit} 
}

export default HandleEdit