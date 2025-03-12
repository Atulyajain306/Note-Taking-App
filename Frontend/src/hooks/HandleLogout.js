import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

const HandleLogout = () => {
    const {setauthUser}=useAuthContext();
   const Logout=async()=>{
         try{
              let res=await fetch("https://note-taking-app-8825.onrender.com/logout",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: "include" 
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