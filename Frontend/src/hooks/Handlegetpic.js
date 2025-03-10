import { useAuthContext } from "../context/Auth";
import { useEffect } from "react";
const Handlegetpic = () => {
       const {setProfilepic}=useAuthContext();
      
       useEffect(() => {
         Getpic();
       }, [])
       
   const Getpic=async()=>{
         try{
            let res=await fetch("/api/getpic",{
                method:"GET",
                headers:{"Content-Type":"application/json"},
                credentials: "include"    
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