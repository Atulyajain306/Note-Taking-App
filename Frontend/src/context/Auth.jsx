import  {useState,useEffect} from 'react'
import PropTypes from "prop-types";
import { AuthContext } from './AuthContext';

export const AuthContextProvider=({children})=>{
const [authUser,setauthUser] = useState(JSON.parse(localStorage.getItem("item")) || null);
const [isAuth,setIsAuth] = useState(null);
const [profilepic,setProfilepic] = useState(null);
const [singleMessage,setsingleMessage] = useState(null)
const [favourates,setfavourates] = useState([])
const [updated, setupdated] = useState(null)
const [savedmessages,setsavedmessages] = useState([]);
useEffect(() => {
  if (authUser) {
    localStorage.setItem("item", JSON.stringify(authUser));
    setIsAuth(true);
  } else {
    localStorage.removeItem("item");
    setIsAuth(false);
  }
}, [authUser]);       
 return(<AuthContext.Provider value={{authUser,setauthUser,isAuth,setIsAuth,savedmessages,setsavedmessages,favourates,setfavourates,profilepic,setProfilepic,singleMessage,setsingleMessage,updated,setupdated}}>
            {children}
        </AuthContext.Provider>)

}

AuthContextProvider.propTypes = {
       children: PropTypes.node.isRequired,
     };