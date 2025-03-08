import React, { useContext } from 'react'
import { createContext,useState } from 'react'
export const AuthContext=createContext();
export const useAuthContext=()=>{
       return (useContext(AuthContext))
}

export const AuthContextProvider=({children})=>{
const [authUser,setauthUser] = useState(JSON.parse(localStorage.getItem("item")) || null);
const [isAuth,setIsAuth] = useState(null);
const [profilepic,setProfilepic] = useState(null);
const [singleMessage,setsingleMessage] = useState(null)
const [favourates,setfavourates] = useState([])
const [updated, setupdated] = useState(null)
const [savedmessages,setsavedmessages] = useState([]);
          
 return(<AuthContext.Provider value={{authUser,setauthUser,isAuth,setIsAuth,savedmessages,setsavedmessages,favourates,setfavourates,profilepic,setProfilepic,singleMessage,setsingleMessage,updated,setupdated}}>
            {children}
        </AuthContext.Provider>)

}