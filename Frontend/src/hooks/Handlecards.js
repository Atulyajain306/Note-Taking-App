import { useAuthContext } from '../context/Auth';
import { useEffect,useState } from 'react';

const Handlecards = () => {
    const {savedmessages,setsavedmessages,favourates, setfavourates}=useAuthContext();
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
      let res=await fetch("/api/info",{
        method:"GET",
        headers:{"Content-Type":"application/json"}
       });
       let data=await res.json();
         console.log(data);
        setsavedmessages(data);
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