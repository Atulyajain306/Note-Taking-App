import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";
const HandleDelete = () => {
    const {savedmessages,setsavedmessages}=useAuthContext();
   const handleremove=async(id)=>{
        try{
               console.log("id",id);
             let res= await fetch("https://note-taking-app-hgg2.onrender.com/api/delete",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id})
             });
             let data=await res.json();
            if(data.error){
                throw new Error(data.error)
            } 
   setsavedmessages((prevMessages) => prevMessages.filter(msg => msg._id !== id));

            toast.success("Deleted Successfully");
        }catch(error)
        {
            console.log(error)
        }
   }
   return {handleremove}
}

export default HandleDelete