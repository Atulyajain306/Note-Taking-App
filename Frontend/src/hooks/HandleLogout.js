import React from 'react'
import { useAuthContext } from '../context/Auth'
import toast from 'react-hot-toast';

const HandleLogout = () => {
    const {setauthUser}=useAuthContext();
   const Logout=async({song})=>{
         try{
              let res=await fetch("/api/logout",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
              });
            const data=await res.json();
            console.log(data)
              if(data.error){
                throw new Error(data.error);
              }
              localStorage.removeItem("item");
              setauthUser(null);
         }catch(error){
             toast.error(error.message);
         }
   }
   return {Logout}
}

export default HandleLogout