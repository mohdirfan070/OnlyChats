import React, { useEffect, useState } from "react";

export default function Messeges({ prop, isMine , data}) {
  const { message, index, reply, setReply } = prop;
  const { currentChatUser , props }= data;
  return isMine ? (
    <li
    onClick={() => setReply({text:message.text})}
      key={index}
      className={
        "flex items-end text-[2.5vh]  p-[0.5vh] text-gray-50 shadow px-[0.5vw]   self-end bg-second rounded-[0.5vh] m-[0.51vh] w-max hover:cursor-pointer"
      }
    >
      <div>
      {message && message.reply ? (
        <>
         <div className="p-[1.8vh] pr-[4vh] bg-second flex justify-between items-baseline text-white rounded-[0.82vh]">
            <pre className="break-words whitespace-pre-wrap text-second p-[0.4vh] rounded-[0.3vh] bg-white">
            
            {/* { message.reply.sender != props.user.email ?   <span className="text-emerald-200" >{props.user.name}</span> : <span> {currentChatUser.name} </span> } */}

            {/* <br /> */}

         
              
              {message && message.reply
                ?( message.reply.text.split("").length > 35
                  ? message.reply.text.substring(0, 34) + "..."
                  : message.reply.text)
                : ""}
            </pre>
          </div>
        </>
      ) : (
        <></>
      )}
      <pre
        className="pl-[0.5vh] max-w-[70vw] h-min break-words whitespace-pre-wrap"
        name=""
        id=""
      >
        {message.text}
      </pre>{" "}
      </div>



      <span className="pl-[0.5vh] text-[1.7vh] text-blue-200 text-nowrap ">
        {new Date(prop.message.createdAt).toLocaleTimeString().split(":")[0] +
          ":" +
          new Date(prop.message.createdAt).toLocaleTimeString().split(":")[1] +
          new Date(prop.message.createdAt)
            .toLocaleTimeString("en-US", { hour12: true })
            .split(" ")[1]}
      </span>

    </li>
  ) : (
    <li
    onClick={() => setReply({text:message.text})}
      key={index}
      className=" flex items-end text-[2.5vh]  p-[0.5vh] text-gray-50. shadow px-[0.5vw]   self-start bg-frontform rounded-[0.5vh] m-[0.51vh] w-max  hover:cursor-pointer"
    >
      
      <div>
      {message && message.reply  ? (
        <>
          <div className="p-[1.8vh] pr-[4vh] bg-second flex justify-between items-baseline text-white rounded-[0.82vh]">
            <pre className="break-words whitespace-pre-wrap text-white bg-second">
            
           {/* {message.reply.sender == props.user.email ?   <span className="text-emerald-200" >{props.user.name}</span> : <span> {currentChatUser.name} </span> } */}
            {/* <br /> */}
          

              {message && message.reply
                ?( message.reply.text.split("").length > 35
                ? message.reply.text.substring(0, 34) + "..."
                : message.reply.text
                ): ""}
            </pre>
          </div>
        </>
      ) : (
        <></>
      )}
      <pre
        className="pl-[0.5vh] max-w-[70vw] h-min break-words whitespace-pre-wrap "
        name=""
        id=""
      >
        {message.text}
      </pre>{" "}
      </div>

      <span className="pl-[0.5vh] text-[1.7vh] text-blue-400 text-nowrap ">
        {new Date(message.createdAt).toLocaleTimeString().split(":")[0] +
          ":" +
          new Date(message.createdAt).toLocaleTimeString().split(":")[1] +
          new Date(message.createdAt)
            .toLocaleTimeString("en-US", { hour12: true })
            .split(" ")[1]}
      </span>
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
  );
}
