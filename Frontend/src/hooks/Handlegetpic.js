import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
const Handlegetpic = () => {
       const {setProfilepic}=useAuthContext();
       
   const Getpic=async()=>{
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
       console.log(error);
    }
}

useEffect(() => {
    Getpic();
  }, [])
   return {Getpic}
}

export default Handlegetpic