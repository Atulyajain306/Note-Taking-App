import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const HandleProfilepic = () => {
    const {setProfilepic}=useAuthContext();
  const Profilepic=async(formdata,id)=>{
     try{
          let res=await fetch(`https://note-taking-app-8825.onrender.com/upload/profilepic/${id}`,{
            method:"POST",
            body: formdata,
            credentials: "include" 
          });
          let data=await res.json();
             console.log(data)
             setProfilepic(data.Profilepic);
          if(data.error){
            throw new Error(data.error)
          }
          toast.success("Profilepic Added");
     }catch(error){
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
  return {Profilepic}
}

export default HandleProfilepic