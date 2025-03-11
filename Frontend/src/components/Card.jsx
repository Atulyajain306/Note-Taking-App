import toast from 'react-hot-toast';
import PropTypes from "prop-types";
import { MdContentCopy } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import SpeechPlayer from './SpeechPlayer';
import { TbCircleLetterTFilled } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import { useState,useEffect, useCallback } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaRegStickyNote } from "react-icons/fa";
import { useAuthContext } from '../context/Auth';
import { extractTime } from '../../../Backend/utils/extractTime';
import HandleDelete from '../hooks/HandleDelete';
import HandleEdit from '../hooks/HandleEdit';
import HandleFavourate from '../hooks/HandleFavourate';
import Deletefavourite from '../hooks/Deletefavourite';
import Handlefile from '../hooks/Handlefile';
import Handlenewtitle from '../hooks/Handlenewtitle';
import Handlenewbody from '../hooks/Handlenewbody';
const Card = ({bgtitle,setCards}) => {
    const {Liked}=HandleFavourate();
    const {Deleted}=Deletefavourite();
    const {Fileadd}=Handlefile();
    const [isStarred, setisStarred] = useState();
    const [newtitle,setnewtitle]=useState("");
    const [title, settitle] = useState(false);
    const [enlarge, setenlarge] = useState(false);
    const {savedmessages,setsavedmessages,singleMessage,setsingleMessage,updated,setupdated}=useAuthContext();
    const { handleEdit}=HandleEdit();
    const {handleremove}=HandleDelete(); 
    const {handlebody}=Handlenewbody();
    const {cardtitlenew}=Handlenewtitle();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [image, setImage] = useState(null);
    const [popuptitle, setpopuptitle] = useState(null)
    const [editscript, seteditscript] = useState(false);
    const [editbody, seteditbody] = useState(false);
    const [editmessage, seteditmessage] = useState(false);
    const [editnewbody, seteditnewbody] = useState(null);
  
  const HandlenewWindow = (msg) => {
    setupdated(msg.updatedAt);
    setSelectedCard(msg);
    setsingleMessage(msg);
  };
  const FetchCards=useCallback(async()=>{
    const res=await fetch("/api/cards",{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    });
    const data=await res.json();
    let rr=sortMessages(data)
    setCards(rr);
},[setCards]) 
  const closePopup = () => {
    setSelectedCard(null);
    setenlarge(false);
    seteditbody(false);
    seteditscript(false);
    setsingleMessage(null);
  };
    const Copy=(c)=>{ 
        navigator.clipboard.writeText(c);
         toast.success("Copied to clipboard");
    }
    const Handlerename=(idx,title)=>{
         settitle(true);
         setisStarred(idx);
         setnewtitle(title);
         FetchCards();
    }
    const toggleStar = (idx) => {
        const q=[...savedmessages];
        setsavedmessages(q);
          Liked(idx);
          FetchCards(); 
      };
     const removeStar=(idx)=>{
      const q=[...savedmessages];
        setsavedmessages(q);
          Deleted(idx);
          FetchCards(); 
     } 
    const time=(time)=>{
       const w= extractTime(time);
       return w
    }
    const HandleChange=(newtitle,_id)=>{
          handleEdit(newtitle,_id);
          settitle(false);
          setnewtitle(""); 
          FetchCards();
    }
    const Handledelete=(id)=>{
          handleremove(id);
          FetchCards();
    }
  const HandleFile=(id)=>{
       if(!image){
        return toast.error("Please select an Image");
       }
       const formData=new FormData();
       formData.append("image",image);
         Fileadd(formData,id);
         setImage(null);
  }
  const File=(e)=>{
    setImage(e.target.files[0]);
  }
  const Enlarge=()=>{
         setenlarge(true);
         seteditscript(false)
         document.getElementById("img").style.visibility="hidden";
        
  }
  const Delarge=()=>{
     setenlarge(false);
     document.getElementById("img").style.visibility="visible";
  }
  
  const HandlenewChange=(title)=>{
         seteditscript(true); 
         setpopuptitle(title);

  }
  const HandlemessageChange=(message)=>{
        seteditbody(true);
        seteditmessage(true);
        seteditnewbody(message);
  }
  const SavenewTitle=(id)=>{
       seteditmessage(false);
       seteditbody(false);
       handlebody(id,editnewbody); 
       seteditnewbody("");
  }
  const Handletitleedit=(id)=>{
      seteditscript(false);
     cardtitlenew(popuptitle,id);
     setpopuptitle("");
  }
  useEffect(() => {
    FetchCards();
  }, [singleMessage,FetchCards])
   
  return (
       <div className='flex gap-x-2 w-[80vw] flex-wrap gap-y-2 h-[70vh] overflow-y-auto   overflow-x-hidden'> 
     { savedmessages && savedmessages.length >0 ?  
     savedmessages.map((msg,idx)=>(
     <div key={idx} onDoubleClick={()=>{HandlenewWindow(msg)}} className='md:w-[260px] h-[50vh] border hover:bg-stone-200 cursor-pointer w-[250px] border-slate-400  rounded-lg bg-neutral-100 relative'>   
    {msg.isAudio ? <FaPlay  className='flex justify-center relative left-52 top-3 size-9' /> :<TbCircleLetterTFilled className='flex  justify-center relative left-52 top-3 size-10'  />}
        <div className='relative bottom-4 left-3 text-gray-500'>{time(msg.createdAt)}</div>
      <div className='font-bold py-4 px-2'>{title && isStarred===idx  ? ( <div className='flex gap-x-1'> <input value={newtitle} onChange={(e)=>{setnewtitle(e.target.value)}} className='md:w-[10vw] w-[25vw] border border-black rounded-md text-gray-500 px-2 py-1' type="text" /> <div onClick={()=>{HandleChange(newtitle,msg._id)}} className='text-white justify-center items-center rounded-xl px-2 py-1 bg-gray-600'>Save</div></div> )
     : <div className='flex flex-wrap  px-1 break-all overflow-y-hidden  overflow-x-clip'> {msg.title}</div>}</div>
              <div className='w-56 overflow-hidden'>
        <p className='relative left-5 flex flex-wrap-reverse px-2   overflow-y-hidden overflow-x-auto break-all mx-1 text-wrap h-[29vh] text-slate-500'>{msg.message}</p></div>
        <MdContentCopy id='copy' className='absolute top-[46vh] left-48'  onClick={()=>{Copy(msg.message)}} /> 
        <BsThreeDots className='absolute top-[46vh] left-56' onClick={()=>{setOpenDropdown(openDropdown === idx ? null : idx)}} />
           
       { msg.favoutite  ? <FaStar className='absolute top-[46vh] m-1' onClick={() => removeStar(msg._id)} /> :<CiStar className='absolute top-[46vh] m-1' onClick={() => toggleStar(msg._id)} />}
       { openDropdown === idx && (<div id="dropdownMenu" className="absolute z-10 left-60 top-[46vh] mt-2 w-25 bg-white border border-gray-500 shadow-xl rounded-lg">
        <a onClick={()=>{Handlerename(idx,msg.title)}} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Rename</a>
        <a onClick={()=>{Handledelete(msg._id)}} className="block px-4 py-2 text-red-600 hover:bg-gray-200">Delete</a>   
            </div>)}
         </div>
     )): <div className='absolute left-[50vw] top-[45vh] text-4xl font-bold'>{bgtitle}</div> } 
   { selectedCard ? (
<div className="fixed inset-0 flex items-center z-30 justify-center bg-black bg-opacity-50"> <div  className="bg-white p-6 rounded-lg shadow-lg w-[80vw] h-[74vh]" 
             onClick={(e) => e.stopPropagation()} >
             <button  onClick={closePopup} className='fixed left-[87vw] top-[16vh] justify-center '><RxCross2 className='size-8' /></button>
      <h1 className='text-3xl m-3 font-bold flex gap-x-4 items-center'>Transcript <FaRegStickyNote /> <p className='text-lg flex gap-x-1 font-semibold text-slate-500'><div className='text-black font-bold'>CreatedAt:</div>{time(singleMessage.createdAt)}</p> <p className='text-lg flex gap-x-1 relative left-3  font-semibold text-slate-500'><div className='text-black font-bold'>LastUpdated:</div>{time(updated)}</p> </h1>
            <h2 onDoubleClick={()=>{HandlenewChange(singleMessage.title)}} className={`text-2xl font-bold rounded-lg w-[77vw] flex ${editscript ? null : "border border-black"} justify-between  px-2 py-2`}>{ editscript ?  
        (<form onSubmit={(e)=>{Handletitleedit(singleMessage._id),e.preventDefault()}} className='w-full mx-2' ><input value={popuptitle} className='bg-neutral-100 w-full rounded-lg relative h-12 bottom-2 px-2 py-2 border border-black'  onChange={(e)=>{ setpopuptitle(e.target.value)}} /></form>) : singleMessage.title} <FaRegCopy className='cursor-pointer' onClick={()=>{Copy(singleMessage.title)}} /></h2>
        {singleMessage.isAudio ? <SpeechPlayer message={singleMessage.message} /> : null}
        <p onDoubleClick={()=>{HandlemessageChange(singleMessage.message)}} className={`text-gray-600 mt-4 border-zinc-300 ${editmessage ? null :"border border-gray-800 w-[75vw] h-[30vh]"}   overflow-y-auto  rounded-lg px-2 py-1`}>{editmessage ?<textarea value={editnewbody} onChange={(e)=>seteditnewbody(e.target.value)} className='w-[75vw] resize-none overflow-y-auto px-2 py-3 h-[30vh] border border-black rounded-lg bg-zinc-100 text-gray-600' /> :singleMessage.message} </p>
            <MdContentCopy className='relative cursor-pointer size-4 left-[76vw] bottom-[30vh] ' onClick={()=>{Copy(singleMessage.message)}} />
           <div className='flex gap-x-5'> 
             {singleMessage.ImageURL && (<>
               <img src={`/api/${singleMessage.ImageURL}`} id='img' className={`w-60 cursor-pointer ${singleMessage.isAudio ? "h-24" : "h-28"} rounded-md`} onClick={Enlarge} />
             </>)}
   {enlarge ? (<div className='absolute top-24 right-[20vw] z-50 flex bg-opacity-100 m-1'><div className='bg-stone-200 px-6 py-8  rounded-xl shadow-4xl w-[60vw] h-[75vh] '>
    <RxCross2 onClick={Delarge} className='size-8 w-fit relative left-[55vw] bottom-4  z-40 cursor-pointer' />
     <div className=' flex justify-center items-center  w-full h-full'>
     <img  src={`/api/${singleMessage.ImageURL}`} className='max-w-full rounded-lg max-h-full object-contain mb-12' onClick={Enlarge}  alt='Enlarged' />
      </div>
      </div>
      </div>) :null}
     <div className='relative inline-block'>
      <input type="file" onChange={File} id="fileInput" className='hidden' />
      <label htmlFor="fileInput">
   <GoPlus  className='mt-5 size-16 cursor-pointer border rounded-lg border-black ' /></label>
      </div>
    <button onClick={()=>{HandleFile(singleMessage._id)}} className='relative top-8 ml-3 cursor-pointer text-black px-3 py-2 h-10 font-bold bg-red-600 rounded-lg'>Save</button>
    <button onClick={()=>{SavenewTitle(singleMessage._id)}} className={`text-white bg-green-600 px-4 h-10 rounded-xl font-bold absolute left-[81vw] top-[75vh] ${editbody ? null :'hidden'} `} >Save Text</button>
            </div>
          </div>
         </div> ) : null }   
    </div>   
  );
};

Card.propTypes = {
  bgtitle: PropTypes.string.isRequired, 
  setCards: PropTypes.func.isRequired, 
};

export default Card

function sortMessages(w){
  return w.sort((a,b)=>{
    const dateA=new Date(a.createdAt);
    const dateB=new Date(b.createdAt);
    return dateA-dateB 
  })};