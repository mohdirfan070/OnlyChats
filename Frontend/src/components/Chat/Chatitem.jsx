import React, { useState, useEffect, useRef } from "react";
import TypeMsg from "./TypeMsg";
import { useSocketService } from "../../services/socketService/useSocketService";
import { useCurrentChatUser } from "../../contexts/Chats/CurrentChatUser";
import { useAuthContext } from "../../contexts/AuthContext";
import EmojiPicker from 'emoji-picker-react';
import { useToggleContext } from "../../pages/Home/Home";

const fetchChats = async (socketInstance, currentChatUser, userEmail) => {
  socketInstance.emit("fetch-chats", {
    sendTo: currentChatUser,
    username: userEmail,
  });
};

export default function ChatItem(props) {
  const { socketInstance } = useSocketService();
  const { user } = useAuthContext();
  const { currentChatUser } = useCurrentChatUser();
  const [allMsg, setAllMsg] = useState([]);
   const [msg , setMsg] = useState('');
  const chatList = useRef(null);
  const { toggle , setToggle }= useToggleContext();

  const handleMessage =async () => {
    if (socketInstance && currentChatUser.email) {
           await socketInstance.emit("sent-msg" , { text:msg , sendTo:currentChatUser.email , username:props.user.email , receiverSocketId:currentChatUser.socketId });
           setMsg("");
    }
   };

  // Request for current user Chats
  useEffect(() => {
    const fetchData = async (data) => {
      if (socketInstance && currentChatUser.email) {
        await fetchChats(socketInstance, currentChatUser.email, data);
      }
    };
    fetchData(props.user.email);
  }, [socketInstance, currentChatUser, props.user.email]);

  // Fetching Current User Chats
  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("current-user-chats", (chats) => {
        // console.log(chats);
        setAllMsg([...chats]);
      });

      return () => {
        socketInstance.off("current-user-chats");
      };
    }
  }, [socketInstance]);


  //Listenning to new message
 
  // Listening to new message
useEffect(() => {
  if (socketInstance) {
    socketInstance.on("new-msg", (data) => {
      // console.log(data);
      // console.log("New Message:", msg);
      // Filter messages based on the current chat user
      try{
        if ((data.newMsg.username == currentChatUser.email && data.newMsg.sendTo == props.user.email) || ( data.newMsg.username == props.user.email && data.newMsg.sendTo == currentChatUser.email ) ) {
          setAllMsg((allMsg) => [...allMsg, data.newMsg]);
        }else{
          // alert(`New message from ${data.user.name}`);
        }
      }catch(error){
        // console.log(error)
      }
    });
    return () => {
      socketInstance.off("new-msg");
    };
  }
}, [socketInstance, allMsg, currentChatUser, props.user.email]);








  // ScrollTo Bottom FuncTion
  useEffect(() => {
    if (chatList.current) {
      chatList.current.scrollTop = chatList.current.scrollHeight;
    }
  }, [allMsg]);




  if (currentChatUser && currentChatUser.name) {
    return (
      <section
        id="chat-compo"
        className={`chat-compo w-[72vw] relative h-[100vh] bg-backform flex justify-start flex-col items-baseline px-[0vh] pb-[3vh] right-chat overflow-hidden  ${!toggle?'max-lg:flex w-[100vw]':"max-lg:hidden"}`}
      >
        <div className="  w-full rounded-b-[1.3vh] bg-second flex items-center p-[0.82vw]">
         
         <button className="mx-[1vw]" onClick={()=>setToggle(true)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ECEBF3" className="bi bi-arrow-return-left" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/></svg>
</button>

           <img
            className="h-[5vh] my-[0.85vh] rounded-full shadow-2xl border-[0vh] border-white"
            src={`${currentChatUser ? currentChatUser.profilePicture : ""}`}
            alt=""
          />
          <h1 className="text-[4vh] ml-[0.5vw] my-[0.85vh] font-bold text-white">
            {currentChatUser ? currentChatUser.name : "User"}
          </h1>
        </div>

        <ul
          ref={chatList}
          className="relative flex flex-col overflow-y-auto   p-[1vh] w-full pb-[8vh]"
        >
          {allMsg &&
            allMsg.map((message, index) =>
              message.username == currentChatUser.email && message.sendTo==props.user.email ? (
                <li
                  className="flex items-end text-[2.5vh] p-[0.5vh] rounded-[0.5vh] bg-frontform shadow px-[0.5vw]   m-[0.51vh] max-w-min"
                  key={index}
                ><pre   className="text-wrap max-w-[85%]"    name="" id="">
                  {message.text}
                </pre>
                 <span className="pl-[0.5vh] text-[1.7vh] text-blue-500 text-nowrap " >{ new Date(message.createdAt).toLocaleTimeString('en-US',{hour12:true}) }</span>
                </li>
              ) :  (
                <li
                  className=" flex items-end text-[2.5vh]  p-[0.5vh] text-gray-50 shadow px-[0.5vw]   self-end bg-second rounded-[0.5vh] m-[0.51vh] w-max"
                  key={index}
                >
                  <pre className="pl-[0.5vh] max-w-[70vw] h-min break-words whitespace-pre-wrap" readOnly  rows={message.text.split("\n").length}  name="" id="">
                  {message.text}
                </pre> <span className="pl-[0.5vh] text-[1.7vh] text-blue-300" >{  new Date(message.createdAt).toLocaleTimeString('en-US',{hour12:true})}</span>
                  <span>
                    {message.status == "read" ? (
                      <>
                        <svg
                        className="h-[2.1vh] w-[2.1vw] text-blue-200"
                         viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12.5L5.5 17L11 9.5"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8.5 15L12 18.5L22 6.5"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </>
                    ) : (
                      " "
                    )}

                  </span>{" "}
                </li>
              )
            )}
        </ul>

        <div className="absolute bottom-0 overflow-auto min-w-full pl-[1vh] pr-[2.5vh] py-[1vh] ">
          {/* <TypeMsg msgData={{setAllMsg , currentChatUser , allMsg  , user }}  /> */}


          <div
    id="typeMsg"
      className={`sticky bottom-0   right-0 flex  screen  rounded-[0.5vh]  border-[0.08vh] border-prime :hover:border hover:border-[1px] hover:border-second bg-white min-h-[8vh] overflow-hidden min-w-full max-h-[2vh]`}
    >     
      <textarea 
      autoFocus 
        onChange={(e)=>setMsg(e.target.value)}
        accessKey="z"
        value={msg}
        rows={1}
        placeholder="Type messege "
        className={` min-w-[80%] resize-none bg-frontform  caret-blue-800  p-[2vh] text-[3vh] outline-none rounded-[0.5vh]  `}
      />
      
        <button onClick={handleMessage} className=" w-[20%]  z-20 active:bg-fourth hover:bg-fourth bg-second px-[3vh]  text-white font-extrabold text-[3vh] rounded-r-[0.5vh] " >{">"}</button>
      </div>


        </div>
        {/* <EmojiPicker   width={"75vw"} lazyLoadEmojis="true" emojiVersion={false} onEmojiClick={(e)=>{console.log(e) , setMsg((msg)=>msg+e.emoji)}} /> */}
      </section>
    );
  }

  return (
    <div  className={` chat-compo relative bg-slate-300 w-[72vw] h-[100vh] max-lg:hidden `}>
      <h2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-second px-[13vh] shadow-[6vh] py-[3vh] rounded-[3vh] text-[3.2vh] text-backform">
        Click on chat to Message
      </h2>
    </div>
  );
}
