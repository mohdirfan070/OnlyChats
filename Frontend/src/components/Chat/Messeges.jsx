import React, { useEffect, useState } from 'react'

export default function Messeges({prop , isMine}) {
  const { message , index , reply , setReply } = prop;
  
 
  return (
    isMine ? 

    <li
    onClick={()=>setReply({...message})}
   key={index}
     className={"flex items-end text-[2.5vh]  p-[0.5vh] text-gray-50 shadow px-[0.5vw]   self-end bg-second rounded-[0.5vh] m-[0.51vh] w-max hover:cursor-pointer"}
  >    
    <pre
      className="pl-[0.5vh] max-w-[70vw] h-min break-words whitespace-pre-wrap"
      name=""
      id=""
    >
      {prop.message.text}
    </pre>

    <span className="pl-[0.5vh] text-[1.7vh] text-blue-200 text-nowrap ">
    {new Date(prop.message.createdAt).toLocaleTimeString().split(":")[0]+":"+new Date(prop.message.createdAt).toLocaleTimeString().split(":")[1]+new Date(prop.message.createdAt).toLocaleTimeString('en-US',{hour12:true}).split(" ")[1] }
    </span>
  </li>
    
  : 

  <li
  onClick={()=>setReply({...message})}
  key={index}
  className=" flex items-end text-[2.5vh]  p-[0.5vh] text-gray-50. shadow px-[0.5vw]   self-start bg-frontform rounded-[0.5vh] m-[0.51vh] w-max  hover:cursor-pointer"
>
  <pre
    className="pl-[0.5vh] max-w-[70vw] h-min break-words whitespace-pre-wrap"
    name=""
    id=""
  >
    {message.text}
  </pre>{" "}
  <span className="pl-[0.5vh] text-[1.7vh] text-blue-400 text-nowrap ">
    {new Date(message.createdAt).toLocaleTimeString().split(":")[0]+":"+new Date(message.createdAt).toLocaleTimeString().split(":")[1]+new Date(message.createdAt).toLocaleTimeString('en-US',{hour12:true}).split(" ")[1] }
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
    
   
  
  )
}
