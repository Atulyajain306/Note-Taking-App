import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";
const HandleProfilepic = () => {
    const {setProfilepic}=useAuthContext();
  const Profilepic=async(formdata,id)=>{
     try{
          let res=await fetch(`https://note-taking-app-hgg2.onrender.com/api/upload/profilepic/${id}`,{
            method:"POST",
            body: formdata
          });
          let data=await res.json();
             console.log(data)
             setProfilepic(data.Profilepic);
          if(data.error){
            throw new Error(data.error)
          }
          toast.success("Profilepic Added");
     }catch(error){
        console.log(error);
     }
  }
  return {Profilepic}
}

export default HandleProfilepic