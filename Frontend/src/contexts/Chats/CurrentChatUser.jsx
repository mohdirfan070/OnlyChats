import React, { createContext, useContext, useEffect, useState } from 'react'
export const CurrentChatUserContext = createContext(null);
export  function CurrentChatUserProvider({children}) {
    
    const [ currentChatUser , setCurrentChatUser   ]= useState({});

    useEffect(()=>{
        // setCurrentChatUser({...currentChatUser});
        // console.log(currentChatUser);
    },[currentChatUser]);

  return (
    <CurrentChatUserContext.Provider value={{currentChatUser , setCurrentChatUser}}  >
        {children}
    </CurrentChatUserContext.Provider>
)
}

export const useCurrentChatUser = ()=> useContext(CurrentChatUserContext);
