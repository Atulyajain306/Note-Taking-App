
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";
const HandleFavourate = () => {
    const {favourates,setfavourates,savedmessages,setsavedmessages}=useAuthContext();
   const Liked=async(_id)=>{
      try{
         let res=await fetch("https://note-taking-app-8825.onrender.com/favourite/true",{
             method:"POST",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify({_id}),
             credentials: "include" 
         });
         const data=await res.json();
         if(data.error){
            throw new Error(data.error)
         }
         const q=savedmessages.map((msg)=> msg._id ===_id ? {...msg, favoutite:!msg.favoutite}:msg);
         console.log("q",q);
         setsavedmessages(q);

         const w=favourates.map((r)=>r._id===_id ?{...r, favourite:true}:r )
          setfavourates(w);
          console.log(favourates);
        toast.success("Added to Favourites")
      }
      catch(error)
      {
        console.log(error)
      }

   }  
   return {Liked}    
}

export default HandleFavourate