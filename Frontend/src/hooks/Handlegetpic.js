import { useAuthContext } from "../context/Auth";
import { useEffect } from "react";
const Handlegetpic = () => {
       const {setProfilepic}=useAuthContext();
      
       useEffect(() => {
         Getpic();
       }, [])
       
   const Getpic=async()=>{
         try{
            let res=await fetch("https://note-taking-app-backend-sooty.vercel.app/api/getpic",{
                method:"GET",
                headers:{"Content-Type":"application/json"}   
            });
            let data=await res.json();
            
            if(data.error){
                throw new Error(data.error);
            }
             let r=data;
            setProfilepic(r || "");
            
         }
         catch(error){
            console.log(error);
         }
   }
   return {Getpic}
}

export default Handlegetpic