
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/Auth';
const HandleSignup = () => {
  const {setIsAuth}=useAuthContext();
    const handle=async({username,password,confirmpassword,email,gender})=>{
        let success=getUserInfo({username,password,confirmpassword,email,gender});
         if(!success){
            return 
         }
          try{
              let res= await fetch("/api/auth",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password,confirmpassword,email,gender}),
                credentials: "include" 
              });
           const data= await res.json();
           if(data.error){
               throw new Error(data.error);
           }
           localStorage.setItem("item",JSON.stringify(data));
           
           setIsAuth(data);
            
          }catch(error){
            toast.error(error.message);
          }
         
    } 
    return {handle}
}
function getUserInfo({username,password,confirmpassword,email,gender}){
      if(!username || !password || !confirmpassword || !email || !gender){
           toast.error("Please Fill all the Fields");
           return false;
      }
      if(password !== confirmpassword){
            toast.error("Passwords do not Match");
            return false;
      }
     if(password.length < 6 ){
        toast.error("Password must be at least 6 characters long");
        return false;
     }
     return true;
}

export default HandleSignup