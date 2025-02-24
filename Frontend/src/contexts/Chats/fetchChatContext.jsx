import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useCurrentChatUser } from './CurrentChatUser';
// import { useSocketService } from '../../services/socketService/useSocketService';
// import { useAuthContext } from '../AuthContext'; 
const useUserCurrentChats =(data)=>{
  console.log(data)
  const [ currentUserChats , setCurrentChatUserChats ]  = useState([]);
  // const { socketInstance   } = useSocketService();
  // const { currentChatUser   } = useCurrentChatUser();
  // const { user  } = useAuthContext();


    socketInstance.emit(data.event,{sendTo:currentChatUser.username , username: data.user.username});


    socketInstance.on("current-user-chats",data=>{
    setCurrentChatUserChats([...data]);
    console.log(data);


  })

  return  currentUserChats ;
}
export default useUserCurrentChats;