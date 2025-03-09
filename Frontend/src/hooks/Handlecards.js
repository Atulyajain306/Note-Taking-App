import { useAuthContext } from '../context/Auth';
import { useEffect,useState } from 'react';

const Handlecards = () => {
    const {savedmessages,setsavedmessages,favourates,setfavourates}=useAuthContext();
    const [loading,setloading]=useState();
    useEffect(() => {
      console.log("saved",savedmessages)
      console.log("favourite:",favourates);
    }, [savedmessages,favourates])
   useEffect(() => {
       card();
   }, [])
  
   

   const card=async()=>{
    try{
        setloading(true)
      let res=await fetch("https://note-taking-app-hgg2.onrender.com/api/info",{
        method:"GET",
        headers:{"Content-Type":"application/json"}
       });
       let data=await res.json();
         console.log(data);
         const w = data.map((msg) => ({
          ...msg, 
          title: msg.title?.length ? msg.title : msg.isAudio ? "Engineering Assignment Audio" : "Engineering Assignment Note",
        })); 
        const mess=sortMessages(w)
        setsavedmessages(mess);
        const idsOnly = savedmessages.map((msg) => ({ _id: msg._id,favourite:msg.favoutite }));
        setfavourates(idsOnly);

    }catch(error){
      console.log(error)
    }finally{
       setloading(false)
    }
   
       
 }

   return {loading}
}

export default Handlecards

function sortMessages(w){
  return w.sort((a,b)=>{
    const dateA=new Date(a.createdAt);
    const dateB=new Date(b.createdAt);
    return dateA-dateB 
  });
   
}