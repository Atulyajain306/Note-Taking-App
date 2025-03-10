import "../App.css"
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";
import { ImSpinner8 } from "react-icons/im";
import { GrSort } from "react-icons/gr";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { MdKeyboardVoice } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { useState,useEffect, useCallback } from 'react';
import HandleLogout from '../hooks/HandleLogout';
import Handlespeechtotext from '../hooks/Handlespeechtotext';
import HandleProfilepic from '../hooks/HandleProfilepic';
import Card from './Card';
import HandleCreation from '../hooks/HandleCreation';
import Handlegetpic from "../hooks/Handlegetpic"
import HandleAudiomessages from '../hooks/HandleAudiomessages';
import { useAuthContext } from '../context/Auth';
import Handlecards from '../hooks/Handlecards';
import toast from 'react-hot-toast';
const Home = () => {
       const [name, setname] = useState([]);
       const [color,setcolor]=useState(false);
  const {Listening,transcript,startListening,stopListening,Load,setLoad}=Handlespeechtotext({continuous:true});
       const {savedmessages,setsavedmessages,profilepic}=useAuthContext();
       const Edit=["Create Notes","No Favourites Added","No Related titles Found"];
        const [bgtitle, setbgtitle] = useState("Create Notes");
        const {loading}=Handlecards();
        const {Logout}=HandleLogout();
        const {Notecreation,Loading}=HandleCreation();
        const {Audiomessage}=HandleAudiomessages();
        const {Profilepic}=HandleProfilepic();
        const {Getpic}=Handlegetpic();
         const [profile, setprofile] = useState(null)
         const [Search, setSearch] = useState("")
         const [message, setmessage] = useState("");
         const [cards, setCards] = useState([]);
         const [picture, setpicture] = useState(profilepic);
         
         const FetchCards=useCallback(async()=>{
          const res=await fetch("/api/cards",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
          });
          const data=await res.json();
          let rr=sortMessages(data)
          setCards(rr);
         
    })
    useEffect(() => {
      let w= localStorage.getItem("item");
      const q=JSON.parse(w);
      setname(q.username);
      Getpic();
      setpicture(profilepic);
      FetchCards();
  }, [profilepic,setsavedmessages,FetchCards,Getpic])
       

      
  const sortMessages=(w)=>{
    return w.sort((a,b)=>{
      const dateA=new Date(a.createdAt);
      const dateB=new Date(b.createdAt);
      return dateA-dateB 
    });
     
  }
         const sort=()=>{
         const reversedmsg=[...savedmessages].reverse();
         setsavedmessages(reversedmsg);
          
         }
        const l=async()=>{
          await Logout();
        }
        const setColor=()=>{
          setcolor(false);
          setbgtitle(Edit[0]);
          setsavedmessages(cards);
            
        }
        const changeColor=()=>{
              setcolor(true);
             setsavedmessages((prevMessages)=>(prevMessages.filter(msg => msg.favoutite===true)));
             setbgtitle(Edit[1]);
             FetchCards();
        }
        const HandleSearch=(e)=>{
               e.preventDefault();
             if(!Search.trim()){
                 setsavedmessages(savedmessages)
             }
              const title=cards.filter((c)=> c.title && c.title.toLowerCase().includes(Search.toLowerCase()));
              if(title.length===0){
                toast.error("No Related Titles found");
              }
              setbgtitle(Edit[2]);
             setsavedmessages(title);
             setSearch(""); 

        }
        const noteCreation=async()=>{   
             await Notecreation(message);
              FetchCards();
             setmessage("");
             document.getElementById("textarea").style.height="44px";
        }
       const Profile=(e)=>{
          setprofile(e.target.files[0]);
          
       } 
      const addbutton=()=>{
        const user=localStorage.getItem("item");
        const r=JSON.parse(user);
        const id=r.id;
        const formdata=new FormData();
        formdata.append("Profile",profile);
        Profilepic(formdata,id);
           setprofile(null);
        
        
      } 
     const Handleno=()=>{
         setprofile(null);
        
     }
     const Handlevoice=()=>{
          Listening ? voiceInput() : startListening()
     }
     const voiceInput=()=>{
         setmessage("");
         setLoad(true);
          Audiomessage(transcript);
            stopListening(); 
           FetchCards(); 
     }
  return (
    <>
      <div className='flex'>
     <div className=' md:w-[18%] w-28  min-h-[94vh] border m-3 border-slate-500 rounded-xl '>
   <a  className='p-4 cursor-pointer hidden text-xl md:flex items-center gap-x-2 font-bold'> <MdOutlineSpeakerNotes size={40} /> All Notes</a>
   <a className='md:hidden felx '><MdOutlineSpeakerNotes className='size-10 mx-6 my-2'  /></a> 
    <div className='md:w-72 w-24 relative left-2 overflow-hidden h-[1px]  bg-slate-400'></div> 
    <div onClick={setColor} className={`rounded-3xl ${color ? null :'text-purple-500 bg-neutral-200'} items-center hover:bg-neutral-200 cursor-pointer hover:text-purple-400 m-2 md:flex hidden font-semibold  gap-x-3 hover:cursor-pointer  bg text-xl py-3 px-4`} > <IoHomeSharp size={30}  /> Home </div>
         <div onClick={setColor} className='md:hidden flex ' > <IoHomeSharp className={`size-10 cursor-pointer mx-6 hover:text-purple-400 ${color ? null :'text-purple-500 bg-neutral-200' }  px-2 py-1 my-2 rounded-md`}   /></div>
       <div onClick={changeColor} className={`rounded-3xl ${color ? 'text-purple-500 bg-neutral-200' :null} items-center m-2 font-semibold md:flex hidden  gap-x-3 hover:cursor-pointer hover:bg-neutral-200 hover:text-purple-500 bg text-xl py-3 px-4`} > <FaStar size={30}  /> Favourites
         </div>
         <div onClick={changeColor} className='md:hidden flex ' > <FaStar className={`size-10 cursor-pointer mx-6 hover:text-purple-400 ${color ? 'text-purple-500 bg-neutral-200' :null}  px-2 py-1 rounded-md`}   /></div>
         <div className='absolute bottom-11 m-0  items-center
          justify-center font-bold gap-x-8 text-2xl w-[17.9vw]  overflow-hidden rounded-b-sm hover:bg-neutral-300 px-4 py-2  flex'>
            <input type="file" onChange={Profile} className='hidden'  id="Input" /> <label htmlFor="Input"> { profilepic?<img className='size-11 md:left-3 border border-white border-solid right-3  relative rounded-full ' src={`/api/${picture}`} alt="" /> : <CgProfile size={40} /> }</label><div className='md:flex hidden justify-center items-center'>{name}<RiArrowDropDownLine size={40} /></div></div>
     </div>
     <div className='w-[80%] h-full items-center justify-center'>
        <div className='flex items-center justify-center'>
       <div>
       <div className='wrap'>
       <div className='icon-wrap'></div>
       <FaSearch  className='relative top-5 z-20 size-6 left-3' />
       <form onSubmit={HandleSearch}>
 <input value={Search}   onChange={(e)=>{setSearch(e.target.value)}} className='bg-slate-100 md:w-[69vw] w-[68vw] my-3 p-2 relative right-4 px-8 border rounded-xl md:rounded-3xl' placeholder='Enter Title to Search here...' type='search' /></form>
            </div>
       </div>
       <div className='m-1 border rounded-full w-[9vw] font-bold relative right-3 px-4 py-2 items-center bg-slate-100 md:flex hidden gap-x-2 text-xl hover:cursor-pointer hover:bg-slate-200'  onClick={sort}><GrSort size={20} /> Sort </div>
       <div onClick={sort} className='flex md:hidden'><GrSort className='size-10 bg-slate-200 px-2 py-1 rounded-lg' /></div>
       </div>
       {profile ? <div className='fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50'><div className='bg-white flex flex-col p-6 rounded-lg shadow-lg md:w-[20vw] md:h-[40vh] w-[60vw]'>
    <div className='text-4xl font-bold text-red-600 justify-center'>Alert!</div>
    <div className='text-xl justify-center font-semibold mt-10 '>Do you want to add a Profile Picture</div>
       <div className='flex mt-14 gap-x-32'>
         <div className='text-white bg-red-500 px-6 w-18 font-bold cursor-pointer justify-center py-1 text-lg rounded-xl' onClick={Handleno}>NO</div>
        <div className='text-white bg-green-500 px-6 w-18 font-bold cursor-pointer justify-center py-1 text-lg rounded-xl' onClick={addbutton}>YES</div> </div> 
       </div></div>:null}
     { loading ? <ImSpinner8 className="h-8 w-8 relative z-20 left-[40vw] top-56 animate-spin text-slate-800" /> :  <Card bgtitle={bgtitle} setCards={setCards} />}
        
         <div className='absolute right-20 top-[85vh] flex items-center justify-center '>
       { Loading ||Load ? < ImSpinner3 className="h-6 w-6 relative right-[51vw] z-20 justify-center items-center wx-2 top-1 animate-spin text-slate-800" />:<FaPencilAlt className='z-10 relative right-2 ' onClick={noteCreation} /> } 
          
          <textarea type="text" value={ Listening? message + (transcript.length ? (message.length ? " ": "")+ transcript : "") : message} id='textarea'  onChange={(e)=>{
            setmessage(e.target.value);
             e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            
           }}  className='md:w-[50vw] w-[370px] right-10 relative   resize-none flex overflow-x-auto border-black py-2 border placeholder-zinc-950 mx-1 bg-stone-100 rounded-xl break-words justify-center items-center scrollbar-thin h-11 min-h-11 max-h-[14vh]   scrollbar-thumb-gray-500 scrollbar-track-gray-200 px-8' placeholder='Enter text here...' rows="1" />
           <button onClick={Handlevoice} className={`${Listening? "bg-green-600" :"bg-red-500"} w-10 items-center justify-center md:w-44 md:flex hidden relative right-7 px-2 font-bold py-3 hover:cursor-pointer  gap-x-2 rounded-lg `}> {Listening ? <> <MdOutlineKeyboardVoice size={20} /> Listening</>:<><MdKeyboardVoice size={20} /> Start Recording</> }</button>
           <button onClick={Handlevoice} className='flex md:hidden'>{Listening ? <> <MdOutlineKeyboardVoice className='bg-green-600 size-10 rounded-md px-2 py-1' size={20} /> </>:<><MdKeyboardVoice className='bg-red-500 size-10 rounded-md px-2 py-1' /> </> }</button>
          <button onClick={l} className=' rounded-2xl text-xl bg-black items-center justify-center  text-white font-bold hidden  md:flex gap-x-2 fot-bold md:w-36 p-3'>Logout <TbLogout  size={30} /></button>
          <button onClick={l}><TbLogout className='visible md:hidden mx-3 bg-slate-500 px-2 py-1 items-center rounded-md justify-center size-10 '  /></button>
         </div>
     </div>
     </div>
    </>
  )
}

export default Home