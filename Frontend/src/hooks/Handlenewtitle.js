import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth";
const Handlenewtitle = () => {
         const {setsingleMessage,savedmessages,setsavedmessages}=useAuthContext();
     const cardtitlenew=async (popuptitle,id)=>{
          try{
               const res=await fetch(`/api/newtitle`,{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({popuptitle,id})
               })
              let data=await res.json();
              if(data.error){
               throw new Error(data.error)
              }
               if(data.title===""){
                  if(data.isAudio){  
                   data.title="Engineering Assignment Audio"
                  }
                  else{
                    data.title="Engineering Assignment Note"
                  } 
               }
                 setsingleMessage((prev)=>({...prev,title:data.title}));
const filtermess=savedmessages.map((msg)=>(msg._id === data._id ? {...msg,title:data.title} :msg))
              setsavedmessages(filtermess);
              toast.success("Title Editted Succesfully");     
          }
          catch(error)
          {
               console.log(error);
          }
     }
     return {cardtitlenew}
}

export default Handlenewtitle