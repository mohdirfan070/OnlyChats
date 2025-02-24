import React, { Children, createContext, useContext, useEffect, useState } from 'react'
export const AuthContext = createContext();
export  function AuthContextProvider({children}) {
        
        // const [isLogin , setIsLogin ] =  useState(JSON.parse(localStorage.getItem("isLogin")));
        // const [token , setToken ] = useState(JSON.parse(localStorage.getItem("user")).token );

        
            const [isLogin, setIsLogin] = useState(() => {
                const loginStatus = localStorage.getItem("isLogin");
                return loginStatus ? JSON.parse(loginStatus) : false;
            });
            const [token, setToken] = useState(() => {
                const user = localStorage.getItem("user");
                return user ? JSON.parse(user).token : null;
            });

        useEffect(()=>{  
            // console.log(token);
            // setIsLogin(isLogin);
            // setToken(token);
        },[ isLogin , token ]);
        
    return <AuthContext.Provider value={{isLogin , token  , setIsLogin , setToken}}  >
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = ()=>useContext(AuthContext);