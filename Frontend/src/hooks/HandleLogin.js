import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';
const HandleLogin = () => {
    const {setauthUser}=useAuthContext();
  const Login=async({username,password})=>{
      
      try{
           const res= await fetch("https://note-taking-app-8825.onrender.com/log",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({username,password}),
              credentials: "include" 
           });
           const data=await res.json();
           if(data.error){
             throw new Error(data.error);
           }
            localStorage.setItem("item",JSON.stringify(data));
           setauthUser(data);
      }
      catch(error){
        toast.error(error.message)
      }
  }
  return {Login}
}

export default HandleLogin