import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { signupFunction } from "./Signup.js";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
   const { isLogin , token , setIsLogin  , setToken } = useAuthContext();
   const [ loginStatus , setStatus ]= useState({status:true,msg:""});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    const result = await signupFunction(data);
      // console.log(result);
      setStatus({...loginStatus,status:result.data.status,msg:result.data.message});
      result.data.status && navigate("/");
      localStorage.setItem("isLogin" , JSON.stringify({isLogin:result.data.status}));
      localStorage.setItem("user" , JSON.stringify({...result.data.user}));
      result.data.status && (setIsLogin(result.data.status) , setToken(result.data.user.token));
  };

  return (
    <div className="fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] text-3xl text-prime m-auto border-[0.032rem] bg-linear-to-b from-backform from-80% to-frontform min-w-full max-w-[32rem] h-[33rem]  p-[2rem] rounded-lg  ">
                <h1 className="text-center font-semibold underline mb-2" >User SignUp</h1>
                <p className=" text-center text-[3vh]" >Already a user? <Link  to={"/login"} className=" text-center text-[3vh] text-blue-500 hover:underline" >Click to Login</Link></p>
      {
        
        !loginStatus.status ? <div className="fixed bg-[rgba(225,225,225,0.4)] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-[100vw] h-[100vh] ">
        <div className="fixed top-[50%] left-[50%]   translate-x-[-50%] translate-y-[-50%] z-50  rounded border border-red-400 px-32 py-12 bg-white" >
         <span className="text-red-600 text-center whitespace-nowrap text-[1.3rem] " >{loginStatus.msg}</span> <br />
         <button onClick={(loginStatus)=>setStatus({...loginStatus,status:!loginStatus.status})} className="px-4 py-3 m-2 bg-red-500 text-nowrap  text-white text-[1.2rem] font-semibold rounded" >Try Again</button>
        </div>
       </div> 
       : ""

      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          className={` m-1 ${errors.email && "text-red-600"} text-[1.52rem]`}
          htmlFor="email"
        >
          {!errors.email ? "Email" : errors.email.message}
          <br />
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email Required!",
              },
            })}
            className={`border-2 bg-white   ${
              errors.email && "text-red-600 border-2 border-red-600 "
            } text-[1.5rem] w-full  outline-none p-2 rounded  hover:border-blue-600`}
            id="email"
            type="email"
            placeholder="xyz@gmail.com"
          />
        </label>



        <label
          className={` m-1 ${errors.name && "text-red-600"} text-[1.52rem]`}
          htmlFor="name"
        >
          {!errors.name ? "Name" : errors.name.message}
          <br />
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Name Required!",
              },
            })}
            className={`border-2 bg-white   ${
              errors.email && "text-red-600 border-2 border-red-600 "
            } text-[1.5rem] w-full  outline-none p-2 rounded  hover:border-blue-600`}
            id="name"
            type="text"
            placeholder="Xyz"
          />
        </label>

        <label
          className={` m-1 ${errors.username && "text-red-600"} text-[1.52rem]`}
          htmlFor="username"
        >
          {!errors.username ? "Name" : errors.username.message}
          <br />
          <input
            {...register("username", {
              required: {
                value: true,
                message: "Username Required!",
              },
            })}
            className={`border-2 bg-white   ${
              errors.email && "text-red-600 border-2 border-red-600 "
            } text-[1.5rem] w-full  outline-none p-2 rounded  hover:border-blue-600`}
            id="username"
            type="text"
            placeholder="xyz@125"
          />
        </label>   
            

        <label
           
          className={` m-1 ${
            errors.password && "text-red-600"
          }  text-[1.52rem]`}
          htmlFor="password"
        >
          {!errors.password ? "Password" : errors.password.message}
          <br />
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password Required!",
              },
              minLength: {
                value: 6,
                message: "Password must exceeds 6 characters",
              },
            })}
            className={`border-2  bg-white ${
              errors.password && "text-red-600 border-2 border-red-600 "
            }   outline-none p-2 rounded  text-[1.5rem] w-full   hover:border-btn-primary`}
            id="password"
            placeholder="Enter Password"
            type="password"
          />
        </label>

       <button        
          className="absolute   bottom-3 left-[30%] border bg-btn-primary text-white border-blue-600 rounded font-semibold px-12 py-2  shadow"
          type="submit"
        >
          SignUp
        </button>
      </form>
    </div>
  );
}
