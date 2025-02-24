import React from "react";
import { useCurrentChatUser } from '../../contexts/Chats/CurrentChatUser';
import { useToggleContext } from '../../pages/Home/Home';


export default function userListItem(prop) {
  const {currentChatUser , setCurrentChatUser } = useCurrentChatUser();
 const { toggle  , setToggle }= useToggleContext();

  return (
  toggle ?  <div onClick={()=>{setCurrentChatUser(prop.user),setToggle(!toggle)}} key={prop.user.email} className={"flex items-center p-[0.82vw] bg-frontform border-b-[0.08vh]  hover:cursor-pointer hover:bg-backform  select-none   "}>


      <img
        className="h-[5vh] my-[0.85vh] rounded-full shadow-2xl border-[0.1vh] border-white"
        src={`${prop.user.profilePicture}`}
        alt=""
      />
      {/* <h1 className=" text-[4vh] ml-[0.5vw] my-[0.85vh] font-bold text-third ">
        {prop.user.name ? (prop.user.name.split("").length> 15 ? prop.user.name.substring(0,15)+"..." : prop.user.name ) : ""}
      </h1> */}


      <h1 className=" text-[4vh] ml-[0.5vw] my-[0.85vh] font-bold text-third ">
        {prop.user.username ? (prop.user.username.split("").length> 15 ? prop.user.username.substring(0,15)+"..." : prop.user.username ) : ""}
      </h1>


    </div> : ""
  );
}
