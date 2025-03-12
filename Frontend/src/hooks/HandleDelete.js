import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const HandleDelete = () => {
    const {setsavedmessages}=useAuthContext();
   const handleremove=async(id)=>{
        try{
               console.log("id",id);
             let res= await fetch("https://note-taking-app-8825.onrender.com/delete",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id}),
                credentials: "include" 
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