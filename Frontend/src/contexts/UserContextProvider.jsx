import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
export const UserContext = createContext();
export  function UserContextProvider({children}) {
        const {isLogin }  = useAuthContext();
    const  [ user , setUser ] =  useState({});

    useEffect(()=>{
        setUser({...JSON.parse(localStorage.getItem("user"))});
    },[isLogin]);

  return  <UserContext.Provider value={{user , setUser}} > 
    {children}
  </UserContext.Provider>;
}

export const  useUserContext = ()=>useContext(UserContext);