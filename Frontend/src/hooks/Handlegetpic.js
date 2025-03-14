import { useAuthContext } from "../context/AuthContext";
import { useEffect,useCallback } from "react";
import toast from "react-hot-toast"
const Handlegetpic = () => {
       const {setProfilepic,setauthUser}=useAuthContext();
       
   const Getpic=useCallback(async()=>{
    try{
       let res=await fetch("https://note-taking-app-8825.onrender.com/getpic",{
           method:"GET",
           headers:{"Content-Type":"application/json"},
           credentials: "include"    
       });
       let data=await res.json();
       
       if(data.error){
           throw new Error(data.error);
       }
        let r=data;
       setProfilepic(r || null);
       
    }
    catch(error){
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
},[setProfilepic])

useEffect(() => {
    Getpic();
  }, [Getpic])
   return {Getpic}
}

export default Handlegetpic