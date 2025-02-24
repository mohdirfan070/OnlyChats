import React, { createContext, useContext, useEffect, useState } from 'react'
export const UseSocketContext = createContext();
export  function UseSocketServiceProvider({children}) {

    const [ socketInstance , setSocketInstance ] = useState(null);

        useEffect(()=>{
            // console.log(socketInstance);
        },[{...socketInstance}]);  

          

        // if(socketInstance){
        //    socketInstance.on("all-active-users" , data=>{console.log(data)});
        // }

        
  return (
    <UseSocketContext.Provider value={{socketInstance , setSocketInstance}}  >
      {children}
    </UseSocketContext.Provider>
  )
}
export const  useSocketService = () =>useContext(UseSocketContext);