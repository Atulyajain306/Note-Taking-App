import { useCallback } from 'react';
import { useAuthContext } from '../context/Auth';
import { useEffect,useState } from 'react';

const Handlecards = () => {
    const {savedmessages,setsavedmessages,setfavourates}=useAuthContext();
    const [loading,setloading]=useState();

   const card=useCallback(async()=>{
    try{
        setloading(true)
      let res=await fetch("https://note-taking-app-eight-sigma.vercel.app/api/info",{
        method:"GET",
        headers:{"Content-Type":"application/json"},
        credentials: "include" 
       });
       let data=await res.json();
         console.log(data);
         const w = data.map((msg) => ({
          ...msg, 
          title: msg.title?.length ? msg.title : msg.isAudio ? "Engineering Assignment Audio" : "Engineering Assignment Note",
        })); 
        const mess=sortMessages(w)
        setsavedmessages(mess);

    }catch(error){
      console.log(error)
    }finally{
       setloading(false)
    }
       
 },[setsavedmessages]) 

 useEffect(() => {
    if(savedmessages.length >0){
      const idsOnly = savedmessages.map((msg) => ({ _id: msg._id,favourite:msg.favoutite }));
      setfavourates(idsOnly);
    }
 }, [savedmessages,setfavourates])
 
 useEffect(() => {
  card();
}, [card])

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