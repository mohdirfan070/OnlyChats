import React, { useEffect, useState } from 'react'
import { useSocketService } from '../../services/socketService/useSocketService'
import UserListItem from './UserListItem';
import { useToggleContext } from '../../pages/Home/Home';

export default function UserList(prop) {
  // console.log(prop)
  const { toggle  , setToggle }= useToggleContext();
    const {socketInstance  } = useSocketService();      
    const [users , setUsers ] = useState([]);
    useEffect(()=>{
      if(socketInstance){
        socketInstance.on("all-active-users" , data=>{
          // console.log(data);
          setUsers([...data]);
        });
    }
    },[{...socketInstance}]);

    


  return (

   toggle ? <div id='user-list'  className={`w-[28vw] h-[100vh] bg-frontform   border-r-[0.01vw] overflow-x-hidden  max-lg:w-full `} >
        <div className='flex items-center p-[0.82vw] bg-third rounded-b-[1.3vh]' >  
        <img className='h-[5vh] my-[0.85vh] rounded-full shadow-2xl border-[0.1vh] border-white' src={`${prop.user.profilePicture}`} alt="" />
        <h1 className=' text-[4vh] ml-[0.5vw] my-[0.85vh] font-bold text-white ' >{ prop.user.name ? prop.user.name.split(" ")[0]  : ""}</h1>

      {/* <button onClick={(toggle)=>setToggle(!toggle)} >Toggle Menu</button> */}
       
        </div>
        <p className='bg-fourth font-bold text-[3vh] text-center p-[0.5vh] text-second' >All Online Users</p>
        {
          users.map((user)=>{
            if( prop.user.email!= user.email  ) {
              return <UserListItem   key={user.email} user={user}  />
            }
          })
        }
    </div> : ""

  )
}

