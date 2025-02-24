import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./contexts/AuthContext";



const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const  { isLogin , token  } = useAuthContext(); 
  
  useEffect(() => {
    const socketInstance =   io(url,{ query:{
      "token":token,
    } , withCredentials:true }  );
      setSocket(socketInstance);

      isLogin &&  socketInstance.on("connect", () => {
      // console.log("Connected to WebSocket");
      // console.log(socketInstance.id+"   from useSocket.jsx");
    });
    
    socketInstance.emit("get-all-users");
    
    // socketInstance.on("all-active-users" , data=>{console.log(data)});
    
    // socketInstance.on("all-active-users" , data=>{console.log(data)});

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    return () => {
      socketInstance.disconnect();
      console.log("WebSocket connection closed");
    };
  }, [url]);

  useEffect(()=>{
    try{
      if(!socket){
        throw new Error("Something Went Wrong Please Try Again Later!");
      }
    }catch(error){
      // console.log(error.message);
    }
  },[]);

  return socket;
};

export default useSocket;
