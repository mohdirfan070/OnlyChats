import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import useSocket from '../../useSocket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContextProvider';
import { useSocketService } from '../../services/socketService/useSocketService';
import UserList from '../../components/UserList/UserList';
import Chatitem from '../../components/Chat/Chatitem';
import './Home.css';
export const ToggleContext = createContext(true);

export  function Home() {
  const { socketInstance , setSocketInstance }  = useSocketService();
  const socket = useSocket(import.meta.env.VITE_BACKEND_URL);
  const { isLogin , token  } = useAuthContext();
  const navigate = useNavigate();
  const {user}= useUserContext();
  const [ toggle , setToggle ] = useState(true);
  
  useEffect(_=>{
    ( !isLogin | !token )&&  navigate("/login");
    socket ? setSocketInstance(socket) : "" ;
  } ,[isLogin  , socket ]);

  return (
<ToggleContext.Provider value={{toggle , setToggle}} >
    <div className='flex justify-between' >
     <UserList    user={user} />
      <Chatitem   user={user}  />
    </div>
</ToggleContext.Provider>
  )
}

export const useToggleContext = ()=>useContext(ToggleContext);