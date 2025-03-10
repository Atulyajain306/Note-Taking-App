
import toast from "react-hot-toast"
import { useAuthContext } from "../context/Auth";
const Handlefile = () => {
    const {singleMessage,setsingleMessage}=useAuthContext();
    const Fileadd=async(formData,id)=>{
        try
        {
       const res=await fetch(`/api/upload/${id}`,{
                method:"POST",
                body:  formData,
                credentials: "include" 
            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
          
              setsingleMessage((prev)=>({...prev,ImageURL:data}));
           toast.success("Image Added Successfully");
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return {Fileadd}
}

export default Handlefile