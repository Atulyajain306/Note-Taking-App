import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const Deletefavourite = () => {
       const {favourates,setfavourates,setauthUser,setProfilepic,savedmessages,setsavedmessages}=useAuthContext();
    const Deleted=async(_id)=>{
          try{
              let res= await fetch("https://note-taking-app-8825.onrender.com/favourite/false",{
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
    return {Deleted}
}

export default Deletefavourite