import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";

const Deletefavourite = () => {
       const {favourates,setfavourates,savedmessages,setsavedmessages}=useAuthContext();
    const Deleted=async(_id)=>{
          try{
              let res= await fetch("https://note-taking-app-eight-sigma.vercel.app/api/favourite/false",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({_id}),
                credentials: "include" 
              })
               let data=await res.json();
               if(data.error){
                throw new Error(data.error);
               }
               const q=savedmessages.map((msg)=> msg._id===_id ? {...msg, favoutite:!msg.favoutite}:msg)
               console.log("q",q)
               setsavedmessages(q);
               const w=favourates.map((r)=>r._id===_id ?{...r, favourite:false}:r )
               setfavourates(w);
               console.log(favourates);
                 toast.success("Removed Favourite")
          }
          catch(error)
          {
            console.log(error);
          }
    }
    return {Deleted}
}

export default Deletefavourite