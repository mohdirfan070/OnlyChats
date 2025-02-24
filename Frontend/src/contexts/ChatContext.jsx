import React, { createContext, useContext, useState } from "react";
export const ChatContext = createContext();

 export  function ChatContextCompo({children}) {

      
  const [chats, setChats] = useState([]);


return (<ChatContext.Provider value={{ chats , setChats}} >
          {children}
    </ChatContext.Provider>);
}

export const useChatContext =()=>useContext(ChatContext);
