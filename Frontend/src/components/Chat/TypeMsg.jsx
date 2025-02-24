import React, { useContext, useState  ,useEffect} from "react";
import { useSocketService } from "../../services/socketService/useSocketService";


export default function TypeMsg(prop) {
    const {socketInstance} = useSocketService();
    const [msg , setMsg] = useState('');
    // const { allMsg  , setAllMsg , currentChatUser , user  } = prop;
  
  const sendMsg=(msg)=>{
    console.log({msg , time:Date.now()})
  // //       // msg && socket.emit("msg-to-all",{ msg , toId:"O_Vl1Hw03yDmlnPcAAAF"});
  // //       msg && socketInstance.emit("msg",{msg,id:socketInstance.id});

  //         setAllMsg([...allMsg,{ username:user.email , text:msg , sendTo:currentChatUser.email }]);

            setMsg("");
            
  }




  return (

    <div
    id="typeMsg"
      className={`sticky bottom-0   right-0 flex  screen  rounded-[0.5vh]  border-[0.08vh] border-prime :hover:border hover:border-[1px] hover:border-second bg-white min-h-[8vh] overflow-hidden min-w-full max-h-[2vh]`}
    >     
      <textarea 
      autoFocus 
        onChange={(e)=>setMsg(e.target.value)}
        accessKey="/"
        value={msg}
        rows={1}
        placeholder="Type messege"
        className={` min-w-[80%] resize-none bg-frontform  caret-blue-800  p-[2vh] text-[3vh] outline-none rounded-[0.5vh]  `}
      />
        <button onClick={()=>sendMsg(msg)} className=" w-[20%]  z-20 active:bg-fourth hover:bg-fourth bg-second px-[3vh]  text-white font-extrabold text-[3vh] rounded-r-[0.5vh] " >{">"}</button>
      </div>
  );
}
