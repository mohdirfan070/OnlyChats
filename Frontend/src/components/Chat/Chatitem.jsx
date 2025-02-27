import React, { useState, useEffect, useRef } from "react";
import TypeMsg from "./TypeMsg";
import { useSocketService } from "../../services/socketService/useSocketService";
import { useCurrentChatUser } from "../../contexts/Chats/CurrentChatUser";
import { useAuthContext } from "../../contexts/AuthContext";
import EmojiPicker from "emoji-picker-react";
import { useToggleContext } from "../../pages/Home/Home";
import Messeges from "./Messeges";

const fetchChats = async (socketInstance, currentChatUser, userEmail, page) => {
  socketInstance.emit("fetch-chats", {
    sendTo: currentChatUser,
    username: userEmail,
    page,
  });
};

export default function ChatItem(props) {
  const { socketInstance } = useSocketService();
  const { user } = useAuthContext();
  const { currentChatUser } = useCurrentChatUser();
  const [allMsg, setAllMsg] = useState([]);
  const [msg, setMsg] = useState("");
  const chatList = useRef(null);
  const { toggle, setToggle } = useToggleContext();
  const [page, setPage] = useState(0);
  const [reply , setReply ] = useState({});




  const handleMessage = async () => {
    if (socketInstance && currentChatUser.email) {
      await socketInstance.emit("sent-msg", {
        text: msg,
        sendTo: currentChatUser.email,
        username: props.user.email,
        reply:reply.text       
      });
      setMsg("");
    }
  };

  // Request for current user Chats
  useEffect(() => {
    const fetchData = async (data) => {
      if (socketInstance && currentChatUser.email) {
        await fetchChats(socketInstance, currentChatUser.email, data, page);
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
        try {
          if (
            (data.newMsg.username == currentChatUser.email &&
              data.newMsg.sendTo == props.user.email) ||
            (data.newMsg.username == props.user.email &&
              data.newMsg.sendTo == currentChatUser.email)
          ) {
            setAllMsg((allMsg) => [...allMsg, data.newMsg]);
          } else {
            // alert(`New message from ${data.user.name}`);
          }
        } catch (error) {
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
        className={`chat-compo w-[72vw] relative h-[100vh] bg-backform flex justify-start flex-col items-baseline px-[0vh] pb-[3vh] right-chat overflow-hidden  ${
          !toggle ? "max-lg:flex w-[100vw]" : "max-lg:hidden"
        }`}
      >
        <div className="sticky to-0%  w-full rounded-b-[1.3vh] bg-second flex items-center p-[0.82vw]">
          <button className="mx-[1vw]" onClick={() => setToggle(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ECEBF3"
              className="bi bi-arrow-return-left"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                fillRule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
              />
            </svg>
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
              message.username == currentChatUser.email &&
              message.sendTo == props.user.email ? (
                <>
              <Messeges  isMine={false} prop={{message , index , reply , setReply}} />
                </>
              ) : (
                <>
                <Messeges  isMine={true} prop={{message , index , reply , setReply}} />
                </>
              )
            )}
        </ul>

        <div className="absolute bottom-0 overflow-auto min-w-full pl-[1vh] pr-[2.5vh] py-[1vh] ">
          {/* <TypeMsg msgData={{setAllMsg , currentChatUser , allMsg  , user }}  /> */}

            {reply.text ?<>
              <div className="p-[1.8vh] pr-[4vh] bg-second flex justify-between items-baseline text-white rounded-t-[2vh]" >  <section><span className="font-bold" >Reply to { reply.username == currentChatUser.email ?  currentChatUser.name :  "You" }  </span>  <br /> <pre> {reply && reply.text ? ( reply.text.split("").length > 15 ? reply.text.substring(0,14)+"..." : reply.text ) : "" } </pre></section> <button  onClick={()=>setReply({})}  className="self-end text-gray-50 bg-fifth w-[3.2vh] h-[3.5vh] rounded-[0.71vh] p-[0.5vh] hover:outline-[0.1vh] " ><svg  xmlns="http://www.w3.org/2000/svg" width="2.3vh" height="2.3vh" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg> </button> </div> 
            </>: <></> }

          <div
            id="typeMsg"
            className={` sticky bottom-0   right-0 flex   justify-between  rounded-[0.5vh]  border-[0.08vh] border-primebg-white min-h-[8vh] overflow-hidden min-w-full max-h-[2vh]`}
          >
            <textarea
              autoFocus
              onChange={(e) => setMsg(e.target.value)}
              accessKey="z"
              value={msg}
              rows={1}
              placeholder="Type messege "
              className={` min-w-full resize-none bg-frontform  caret-blue-800 px-[2vh] py-[1.6vh] pr-[9vh] text-[3vh] outline-none rounded-[0.5vh]  `}
            />

            <button
              onClick={handleMessage}
              className="absolute right-[0vh] p-[3vh] pt-[2.5vh] w-min  z-20 active:bg-prime hover:bg-third bg-second   text-white font-extrabold text-[3vh] rounded-r-[0.5vh]  hover:"
            >
              <svg style={{rotate:"45deg"}} xmlns="http://www.w3.org/2000/svg"  width="3vh"
              height="3vh"fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg>
            </button>
          </div>
        </div>
        {/* <EmojiPicker   width={"75vw"} lazyLoadEmojis="true" emojiVersion={false} onEmojiClick={(e)=>{console.log(e) , setMsg((msg)=>msg+e.emoji)}} /> */}
      </section>
    );
  }

  return (
    <div
      className={` chat-compo relative bg-slate-300 w-[72vw] h-[100vh] max-lg:hidden `}
    >
      <h2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-second px-[13vh] shadow-[6vh] py-[3vh] rounded-[3vh] text-[3.2vh] text-backform">
        Click on chat to Message
      </h2>
    </div>
  );
}
